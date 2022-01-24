import React, { useEffect, useState } from "react";
import {
  filterProps,
  filter,
  filterResponserType,
  selectedFilterType,
} from "./dataTypes";
import { SingleSelect } from "./filterTypes";

const Filters: React.FC<filterProps> = (props) => {
  const [filterValues, setFilterValues] = useState<selectedFilterType[]>([]);
  const [filterData, setFilterData] = useState<filterResponserType>();

  useEffect(() => {
    setFilterData(props.data);
  }, [props]);

  useEffect(() => {
    const updatedFilterValues = removeUnwantedFilterData(
      filterValues,
      props.data
    );
    setFilterValues(updatedFilterValues);
  }, [filterData]);

  useEffect(() => {
    if (props.selectedFilterValues) setFilterValues(props.selectedFilterValues);
  }, [props.selectedFilterValues]);

  const removeUnwantedFilterData = (
    filterValues: selectedFilterType[],
    filterData: filterResponserType | undefined
  ) => {
    const updatedfilterValues: selectedFilterType[] = [];

    filterData?.filters.forEach((filter, i) => {
      const filterData = filter.data;
      const currentFilterData = filterValues.filter(
        (filterValue) =>
          filter.dashboardFilterId === filterValue.dashboardFilterId
      );
      const currentFilterValues = currentFilterData.length
        ? currentFilterData[0]
        : null;
      const filteredData = filterData.filter((data: any) => {
        return currentFilterValues?.values?.includes(data.Values);
      });

      updatedfilterValues.push({
        dashboardFilterId: filter.dashboardFilterId,
        values: filteredData.map((filterData) => filterData.Value),
      });
    });
    return updatedfilterValues;
  };

  const renderFilters = (filter: filter, i: number) => {
    let filterValue = filterValues.filter(
      (filterValue) =>
        filterValue.dashboardFilterId === filter.dashboardFilterId
    );
    const values = filterValue.length ? filterValue[0].values : [];

    filterValue = [{ ...filterValue[0], values: values }];

    const filterMap = props.filterMap.filter((f, i) => f.name === filter.name);
    if (filterMap.length > 0) {
      const CustomComponent = filterMap[0].component;
      return (
        <CustomComponent
          {...filter}
          {...{ selectedFilters: filterValue[0] }}
          onChange={filterOnChangeHandler}
        />
      );
    }

    switch (filter.filterTypeName) {
      case "SINGLE_SELECT":
        return (
          <SingleSelect
            key={i}
            {...filter}
            {...{ selectedFilters: filterValue[0] }}
            onChange={filterOnChangeHandler}
          />
        );

      //   case "MULTI_SELECT":
      //     return (
      //       <MultiSelection
      //         key={i}
      //         {...filter}
      //         {...{ selectedFilters: filterValue[0] }}
      //         onChange={filterOnChangeHandler}
      //       />
      //     );

      //   case "DATE_RANGE":
      //     return (
      //       <DateRange
      //         key={i}
      //         {...filter}
      //         {...{ selectedFilters: filterValue[0] }}
      //         onChange={filterOnChangeHandler}
      //       />
      //     );

      //   case "NUMERIC_RANGE":
      //     return (
      //       <NumericRange
      //         key={i}
      //         {...filter}
      //         {...{ selectedFilters: filterValue[0] }}
      //         onChange={filterOnChangeHandler}
      //       />
      //     );

      //   case "NUMERIC_RANGE_SLIDER":
      //     return (
      //       <NumericRangeSlider
      //         key={i}
      //         {...filter}
      //         {...{ selectedFilters: filterValue[0] }}
      //         onChange={filterOnChangeHandler}
      //       />
      //     );
    }
  };

  const filterOnChangeHandler = (value: selectedFilterType) => {
    const tempFilterValues = [...filterValues];
    const index = filterValues.findIndex((filterValue) => {
      return filterValue.dashboardFilterId === value.dashboardFilterId;
    });
    if (index > -1) {
      tempFilterValues[index] = value;
    } else {
      tempFilterValues.push(value);
    }
    setFilterValues(tempFilterValues);
    props.filterValueChange(tempFilterValues, value.dashboardFilterId);
  };

  const clear = () => {
    setFilterValues([]);
    props.clear();
  };

  const CustomFilterContainer = props.customFilterContainer;
  const CustomFilterLayoutContainer = props.customFilterLayoutContainer;
  const CustomButtonContainer = props.buttonContainer;

  return (
    <CustomFilterLayoutContainer>
      {filterData?.filters?.map((f: filter, i: number) => {
        return (
          <CustomFilterContainer key={i} returnFilter={renderFilters(f, i)} />
        );
      })}
      <CustomButtonContainer
        apply={props.apply}
        clear={() => {
          clear();
        }}
      />
    </CustomFilterLayoutContainer>
  );
};

export default Filters;
