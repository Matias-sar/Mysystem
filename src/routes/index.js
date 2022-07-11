const {Router} = require('express')
const {db} = require('../firebase')

const router = Router()

router.get('/', (req, res) => {
    res.render('login',{title: 'MySystem'})
})

router.get('/inicio', async (req, res) => {
    const querySnapshot = await db.collection('trabajo').get()
    const homework = querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()        
    }))
    console.log(homework)
    res.render('index', {homework})
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
    res.redirect('/inicio')
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
    res.redirect('/inicio')
})

router.post('/update-homework/:id', async (req, res) =>{

    await db.collection('trabajo').doc(req.params.id).update(req.body)

    res.send('Tarea actualizada')
})


module.exports = router

