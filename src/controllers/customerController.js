const controller = {};

//Para este caso se va a utilizar la tabla "customer2" en vez de la tabla "customer"
controller.list = (req,res) => {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM customer2', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};

// funcion NEW
controller.new = (req,res) => {
    res.render('customer_new', {});
};


// funcion que escucha los "router..." de customer.js
controller.save = (req, res) => {
    //console.log(req.body.cp); // req.body tiene los datos del formulario contenido en un OBJETO
    //res.send('works')
    const data = req.body;

    //ahora vamos a guardar los DATOS del formulario en Mysql
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer2 set ?', [data], (err, customer) => {
            //console.log(customer);
            //res.send('works');  //envia "works" a pantalla web
            res.redirect('/');
        })
    })

};

//UPDATE PARTE 1
controller.edit = (req, res)=>{
    const {id} = req.params;
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM customer2 WHERE id = ?', [id], (err,customer)=>{
            res.render('customer_edit', {
                data: customer[0]  // customer guarda un ARREGLO y en su interior esta el OBJETO. Por eso se coloca customer[0] para que "data" tenga el valor como OBJETO y asi pueda procesarlo
            });
        });
    });
};

//UPDATE PARTE 2
controller.update = (req,res) =>{
    const {id} = req.params;
    const newCustomer = req.body;  //obtengo los datos del formulario y los guardo en "newCustomer". Una vez tengo los datos, los guardo en la base de datos

    req.getConnection((err,conn) => {
        conn.query('UPDATE customer2 set ? WHERE id=?', [newCustomer,id], (err,rows)=>{
            res.redirect('/');
        });
    });
};

// DEL
controller.del = (req, res)=>{
    const {id} = req.params;
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM customer2 WHERE id = ?', [id], (err,customer)=>{
            res.render('customer_delete', {
                data: customer[0]  // customer guarda un ARREGLO y en su interior esta el OBJETO. Por eso se coloca customer[0] para que "data" tenga el valor como OBJETO y asi pueda procesarlo
            });
        });
    });
};


// DELETE definitivo
controller.delete = (req, res) => {
    //console.log(req.params.id);  //con "req.params" el servidor recibe el ID que tiene que eliminar
    //res.send('works');

    //const id = req.params.id;
    const {id} = req.params;
    req.getConnection((err, conn)=>{
        conn.query('DELETE FROM customer2 WHERE id=?', [id], (err, rows)=>{
            res.redirect('/');
        })
    });
};


module.exports = controller;
