import React from 'react'
import { Select, DatePicker } from 'antd'
const { RangePicker } = DatePicker;

const Filter = ({ onFilterChange, onTypeChange, onDateChange, filter, type, selectedDate }) => {
    const handleFilterChange = (value) => {
        onFilterChange(value);
      };
    
      const handleTypeChange = (value) => {
        onTypeChange(value);
      };
    
      const handleDateChange = (values) => {
        onDateChange(values);
      };
        
  return (
    <div>
       <div className='filters'>
                <div>
                    <h6>Select Filter</h6>
                    <Select value={filter} onChange={handleFilterChange}>
                        <Select.Option value="7">LAST 1 Week</Select.Option>
                        <Select.Option value="30">LAST 1 Month</Select.Option>
                        <Select.Option value="365">LAST 1 Year</Select.Option>
                        <Select.Option value="custom">custom</Select.Option>
                    </Select>
                    {filter === "custom" && (<RangePicker value={selectedDate}  onChange={handleDateChange}  />)}
                </div>
                <div>
                    <h6>Select Type</h6>
                    <Select value={type} onChange={handleTypeChange}>
                        <Select.Option value="all">ALL</Select.Option>
                        <Select.Option value="income">INCOME</Select.Option>
                        <Select.Option value="expense">EXPENSE</Select.Option>
                    </Select>
                    {filter === "custom" && (<RangePicker value={selectedDate}  onChange={handleDateChange} />)}
                </div>
            </div>
    </div>
  )
}

export default Filter
