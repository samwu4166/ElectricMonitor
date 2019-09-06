

export function rowSql2Json(columns){
    let json_data = {};
    columns.forEach(function(column) {
        //console.log(column);
        json_data[column['metadata']['colName']] = column['value'];
    });
    return json_data;
}