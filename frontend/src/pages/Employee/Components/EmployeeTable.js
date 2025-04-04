import React, { useEffect, useState } from 'react'
import Table from '../../../utils/Components/Tables/Table'

const EmployeeTable = props => {

  return (
    <div className='w-[70%] h-[100%] flex pt-[10vh] bg-white right-0 fixed justify-center'>
        <div className='w-[90%] h-[auto]'>
            <Table employees={props.employees} />
        </div>
    </div>
  )
}

export default EmployeeTable