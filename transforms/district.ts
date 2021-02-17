import { YearRow } from '../models/year-row.ts';
import { District as ExtractedDistrict, DistrictAreaType } from '../extracts/district.ts';
import { ProblemType } from '../models/problem-type.ts';
import { ReportBudgetable } from './report-budgetable.ts';

export class District extends ReportBudgetable {
  id: number;
  name: string;
  type: DistrictAreaType;
  publicGreenSpace: number;
  floodHotspot: {
    name: string;
		description: string;
  }[];
  latestYear: YearRow;
  pm25OverThresholdCount: number | null;
  pm25MeasurementCount: number | null;

  constructor(
    district: ExtractedDistrict,
    public years: { [key: number]: YearRow }
  ) {
    super();
    this.id = district.id;
    this.name = district.district;
    this.type = district.type;
    this.publicGreenSpace = district.publicGreenSpace;
    this.floodHotspot = district.floodHotspot;
    this.pm25OverThresholdCount = district.pm25OverThresholdCount;
    this.pm25MeasurementCount = district.pm25MeasurementCount;
    
    this.latestYear = this.years[this.getLatestYear()];
  }

  getValuePerYear(problem: ProblemType): { [key: number]: number | null } {
    const valuePerYear = {} as { [key: number]: number | null };
    for (const year in this.years) {
      valuePerYear[parseInt(year)] = this.years[year].getValueOf(problem);
    }
    return valuePerYear;
  }

  getMinimumValue(problem: ProblemType, rankedByValueGetter?: (yr: YearRow) => number | null):
    { year: number, value: number } | null {
    let min = Number.MAX_VALUE;
    let minYear = 0;
    for (const year in this.years) {
      const value = rankedByValueGetter
        ? rankedByValueGetter(this.years[year])
        : this.years[year].getValueOf(problem);
      if (value === null) continue;
      if (value < min) {
        min = value;
        minYear = parseInt(year);
      }
    }

    if (min === Number.MAX_VALUE) return null;
    return { value: min, year: minYear };
  }

  getMaximumValue(problem: ProblemType, rankedByValueGetter?: (yr: YearRow) => number | null)
    : { year: number, value: number } | null {
    let max = Number.MIN_VALUE;
    let maxYear = 0;
    for (const year in this.years) {
      const value = rankedByValueGetter
      ? rankedByValueGetter(this.years[year])
      : this.years[year].getValueOf(problem);
      if (value === null) continue;
      if (value > max) {
        max = value;
        maxYear = parseInt(year);
      }
    }
    if (max === Number.MIN_VALUE) return null;
    return { value: max, year: maxYear };
  }

  getProblemBudgets(problem: ProblemType | 'all'): { [key:number]: number } {
    const budgets: { [key:number]: number } = {};
    for (const year in this.years) {
      const budget = this.years[year].getBudget(problem);
      if (budget === null) continue;
      budgets[parseInt(year)] = budget;
    }
    return budgets;
  }
  
  getRankings(problem: ProblemType, rankedByValueGetter?: (yr: YearRow) => number | null): {
		ranked: number;
		year: number;
		value: number | null;
	}[] {
    const rankings: { year: number, value: number | null}[] = [];
    for (const year in this.years) {
      rankings.push({
        year: parseInt(year),
        value: rankedByValueGetter ? rankedByValueGetter(this.years[year]) : this.years[parseInt(year)].getValueOf(problem),
      });
    }
    return rankings
      .sort((a, b) => (b.value || 0) - (a.value || 0))
      .map((r, i) => ({
        ranked: i + 1,
        year: r.year,
        value: r.value,
      }));
  }

  getLatestYear(): number {
    const allYears = Object.keys(this.years);
    return parseInt(
      allYears
        .sort((a, b) => parseInt(a) - parseInt(b))
        [allYears.length - 1]
    );
  }
}