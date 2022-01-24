import React, { useState, useEffect } from "react";
import FilterModule from "../modules/filters";
import Data from "../sampleData/data.json";
import { View, Text, SafeAreaView } from "react-native";
import {
  filter,
  selectedFilterType,
  filterResponserType,
} from "../modules/filters/dataTypes";

interface FilterContainerProps {
  apply: (
    filterValues: selectedFilterType[] | undefined,
    filters: filter[]
  ) => void;
  clear: () => void;
  filterData: filterResponserType | undefined;
  selectedValue: selectedFilterType[] | undefined;
  onFilterChange: (
    filterValues: selectedFilterType[],
    selectedDashboardFilterId: number
  ) => void;
  layout: string;
}

const FilterContainer: React.FC<FilterContainerProps> = (props) => {
  const sampleJSON = Data;

  const [filterData, setFilterData] = useState<filterResponserType>({
    filters: [],
    selectedFilters: [],
  });
  const [selectedFilterValues, setSelectedFilterValues] =
    useState<selectedFilterType[]>();

  const apply = async () => {
    props.apply(selectedFilterValues, filterData.filters);
  };

  const clear = () => {
    setSelectedFilterValues([]);
    props.clear();
  };

  const filterValueChange = async (
    filterValues: selectedFilterType[],
    selectedDashboardFilterId: number
  ) => {
    setSelectedFilterValues(filterValues);
    const tempFilterData = { ...filterData, selectedFilters: filterValues };
    setFilterData(tempFilterData);
    props.onFilterChange(filterValues, selectedDashboardFilterId);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-start" }}>
      <View style={{ marginTop: 10 }}>
        <FilterModule
          data={sampleJSON.data}
          apply={() => {
            apply;
          }}
          clear={() => {
            clear;
          }}
          selectedFilterValues={[]}
          filterValueChange={() => {
            filterValueChange;
          }}
          customFilterContainer={CustomFilterContainer}
          customFilterLayoutContainer={SampleComponent}
          buttonContainer={SampleComponent}
          filterMap={[{ name: "CustomComponent", component: CustomComponent }]}
        />
      </View>
    </SafeAreaView>
  );
};

export default FilterContainer;

const SampleComponent: React.FC<any> = (props) => {
  return <View>{props.children}</View>;
};
const CustomFilterContainer: React.FC<any> = (props) => {
  return <View>{props.returnFilter}</View>;
};
const CustomComponent: React.FC<filter> = (props) => {
  return (
    <View>
      <Text>Testig Component</Text>
    </View>
  );
};
