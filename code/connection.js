const fs = require('fs');
const mysql = require('mysql');


connectiondb('host');

function connectiondb(host) {
    const connection = mysql.createConnection({
        host:  host,
        port:  port,
        user: 'user',
        password:  'senha',
    });

    connection.connect(function(err){
   
        try {
          if(err) throw new Error(error);
            
            // insertData(connection);
            selectRows(connection);
        } catch(error) {
            fsappendFile(err);
          }
      });
}

//Slave_running : 
//performance_schema.replication_applier_status == Slave_SQL_Running;
//performance_schema.replication_connection_status == Slave_IO_Running;

function selectRows(conn){
    const Show_Slave_Status = 'SHOW SLAVE STATUS;'
    let host = conn.config.host;
    try{
        conn.query(Show_Slave_Status, function(error, rows){
            console.log('------------');
            console.log(host);
            console.log('------------');        
            if(error) throw error; 
            if(!rows.length) {
                fsappendFile('O host '+host+' não esta com status slave ativo');
                StatusReplicacao(host)
                conn.end();
                return;
            }                  
            fsappendFile('A base esta replicando');
            
        });
    } catch (err) {
        fsappendFile(err);
    }
}

function StatusReplicacao(Slave_Running_Host){
    const connection = mysql.createConnection({
        host:  Slave_Running_Host,
        port:  port,
        user: 'user',
        password:  'user',
    });

    connection.connect( error => {
        if(error) throw error;
        
        let query = "update mysql_servers set status = 'OFFLINE_HARD' where hostname = '127.0.0.1';"
        connection.query(query, (err, rows) => {
        if(err) {
            fsappendFile(err);
            connection.end();
            return;
        }
            fsappendFile('Status de replicação alterado com sucesso');
            let queryupdatestatus = "LOAD MYSQL SERVERS TO RUNTIME;SAVE MYSQL VARIABLES TO DISK; SAVE MYSQL SERVERS TO DISK;";
            connection.query(queryupdatestatus, error => {
                if(error) fsappendFile(error);

                connection.end();
            }), 
            connection.end();
        })
    });
}


function fsappendFile(mensage)  {
    let path = 'error.log'; 
    let mensagelog = mensage + '\n'
    fs.appendFile(path, mensagelog, (err) =>{
        if (err) throw err;
    });
}