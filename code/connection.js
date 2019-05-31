const fs = require('fs');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host:  '',
    port:  ,
    user: '',
    password:  '',
});


connection.connect(function(err){
   
  try {
    if(err) throw new Error(error);
      fs.appendFile('error.log', 'Deu certo', (err) => {
        if (err) 
          throw err;
      });
      insertData(connection);
    // selectRows(connection);
  } catch(error) {
      fs.appendFile('error.log', 'Deu Ruim', (err) => {
        if (err) 
            throw err;
        });
    }
});


function insertData(conn){

    const sql = "INSERT INTO `teste`.`dados`(`nome`, `descricao`) VALUES ?";
    const values = [['o script','funcionou']];

    try {
    conn.query(sql, [values], function (error, results, fields){
        if(error) throw new Error(error);


    
    })
    } catch (error)
            {

            }
}

//Slave_running : 
//performance_schema.replication_applier_status == Slave_SQL_Running;
//performance_schema.replication_connection_status == Slave_IO_Running;

function selectRows(conn){
    const Slave_IO_Running = 'SELECT SERVICE_STATE FROM performance_schema.replication_connection_status;'
    const Slave_SQL_Running = 'SELECT SERVICE_STATE FROM performance_schema.replication_applier_status;';
    
    conn.query(Slave_IO_Running, function(error, rows){
        if(error) throw error;
        console.log(rows[0].SERVICE_STATE);
        
        conn.end();
    });

    conn.query(Slave_SQL_Running, function(error, rows){
        if(error) throw error;
        console.log(rows[0].SERVICE_STATE);
        
        conn.end();
    });

    console.log('------------------');
    console.log(sql1);
}

function verificandoStatusSlave(Slave_SQL_Running, Slave_IO_Running){

}

