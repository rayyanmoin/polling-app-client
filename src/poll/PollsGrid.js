import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const PollsGrid = () => {
	const [rowData, setRowData] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch("http://localhost:8080/api/polls/data");
			const data = await response.json();
			setRowData(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const columnDefs = [
		{ headerName: "ID", field: "id", filter : true },
		{ headerName: "Question", field: "question" , filter:true},
	];

	const gridOptions = {
		defaultColDef: {
			resizable: true,
		},
		pagination: true,
		paginationPageSize: 20,
	};
	const onGridReady = (params) => {
		params.api.sizeColumnsToFit();
	};

	return (
		<div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
			<h1 style={{ textAlign: "center" }}>Polls List</h1>
			<AgGridReact columnDefs={columnDefs} rowData={rowData} gridOptions={gridOptions} onGridReady={onGridReady} />
		</div>
	);
};

export default PollsGrid;
