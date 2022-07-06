

const {Router} = require('express')
const {db} = require('../firebase')

const router = Router()

router.get('/inicio', async (req, res) => {
    const querySnapshot = await db.collection('trabajo').get()
    const homework = querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()        
    }))
    console.log(homework)
    res.send('Hello world')
    //Si no hay tareas se mostrara un mesnaje de advertencia
})

router.post('/homework', async (req,res) =>{
    const {descripcion ,fecha_entrega ,nombre ,requerimiento ,status} = req.body
    await db.collection('trabajo').add({
        descripcion,
        fecha_entrega,
        nombre,
        requerimiento,
        status
    })
    res.send('Nueva tarea')
})

router.get('/edit-homework/:id', async (req, res) =>{
    const doc = await db.collection('trabajo').doc(req.params.id).get()
    console.log({
        id: doc.id,
        ...doc.data()
    })
    res.send('Editar tarea')
})

router.get('/delete-homework/:id', async (req, res) =>{
    await db.collection('trabajo').doc(req.params.id).delete()
    res.send('Tarea eliminada')
})

router.post('/update-homework/:id', async (req, res) =>{

    await db.collection('trabajo').doc(req.params.id).update(req.body)

    res.send('Tarea actualizada')
})

module.exports = router

