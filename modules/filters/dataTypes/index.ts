import * as moment from "moment";
import React from "react";

export type filterValues = {
  param: string;
  value: string | null;
  type: string;
  // min: string,
  // max: string,
  metadata: string | null;
};

export type singleSelectDataType = { Value: string; Text: string };

export type selectDataType = { filterTypeId: number; param: string };

export type filter = {
  dashboardFilterId: number;
  dashboardId: number;
  connectionId: string | null;
  name: string;
  label: string;
  dataType: string;
  data: singleSelectDataType[];
  settings: {} | null;
  filterTypeId: number;
  filterTypeName: string;
  autoSave: boolean;
  onChange?: (values: selectedFilterType) => void;
  selectedFilters?: selectedFilterType;
  values?: selectDataType[];
};

export type filterData = {
  dashboardFilterId: number;
  filterTypeId: number;
  key: string | null;
  name: string;
  values: filterValues[] | null;
};

export type selectedFilterType = {
  dashboardFilterId: number;
  values: string[] | null;
};

export type filterResponserType = {
  filters: filter[];
  selectedFilters: selectedFilterType[];
};

export type filterProps = {
  data: filterResponserType;
  selectedFilterValues: selectedFilterType[] | undefined;
  filterValueChange: (
    values: selectedFilterType[],
    selectedDashboardFilterId: number
  ) => void;
  apply: () => void;
  clear: () => void;
  filterMap: filterMap[];
  customFilterContainer: React.FC<any>;
  customFilterLayoutContainer: React.FC<any>;
  buttonContainer: React.FC<CustomButtonContainerProps>;
};

export type CustomButtonContainerProps = {
  apply: () => void;
  clear: () => void;
};

export type filterMap = {
  name: string;
  component: React.FC<filter>;
};

export type selectOption = {
  value: string;
  label: string;
};
export type optionData = {
  Value: string;
  Text: string;
};

export type dateType = {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
};

export type START_DATE = "startDate";
export type END_DATE = "endDATE";

export type numericRangeData = {
  metadata: string | null;
  param: string;
  type: string;
  value: string;
};

//custom component types
//checkbox
export type checkboxOptiosType = {
  value: number;
  lable: string;
  color: string;
  selected: boolean;
};
