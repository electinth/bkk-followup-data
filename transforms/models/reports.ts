import { ProblemType } from '../problem-type.ts';
import { BaseReport } from "./base-report.ts";
import {
  FloodReport,
  WasteReport,
  GreenReport,
  WaterReport,
  AirReport,
} from "./problem-reports.ts";
import {
  AllReport,
  DistrictAreaReport,
  SingleDistrictReport,
} from "./zonetype-reports.ts";

export interface FloodAllReport extends 
  BaseReport, FloodReport, AllReport {}

export interface FloodDistrictAreaReport extends 
  BaseReport, FloodReport, DistrictAreaReport {}

export interface FloodSingleDistrictReport extends 
  BaseReport, FloodReport, SingleDistrictReport {}

export interface WasteAllReport extends 
  BaseReport, WasteReport, AllReport {}

export interface WasteDistrictAreaReport extends 
  BaseReport, WasteReport, DistrictAreaReport {}

export interface WasteSingleDistrictReport extends 
  BaseReport, WasteReport, SingleDistrictReport {}

export interface GreenAllReport extends 
  BaseReport, GreenReport, AllReport {}

export interface GreenDistrictAreaReport extends 
  BaseReport, GreenReport, DistrictAreaReport {}

export interface GreenSingleDistrictReport extends 
  BaseReport, GreenReport, SingleDistrictReport {}

export interface WaterAllReport extends 
  BaseReport, WaterReport, AllReport {}

export interface WaterDistrictAreaReport extends 
  BaseReport, WaterReport, DistrictAreaReport {}

export interface WaterSingleDistrictReport extends 
  BaseReport, WaterReport, SingleDistrictReport {}

export interface AirAllReport extends 
  BaseReport, AirReport, AllReport {}

export interface AirDistrictAreaReport extends 
  BaseReport, AirReport, DistrictAreaReport {}

export interface AirSingleDistrictReport extends 
  BaseReport, AirReport, SingleDistrictReport {}

export interface ReportSuite {
  alls: {
    [ProblemType.Flood]: FloodAllReport,
  },
}