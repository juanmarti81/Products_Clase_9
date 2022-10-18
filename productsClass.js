const fs = require('fs')

module.exports = class Contenedor {
    name = ""

    constructor (name){
        this.name = "./productos.txt"
    };

    async save (Object) {
        try {
            const readfile = await fs.promises.readFile(this.name, 'utf-8')
            let products = JSON.parse(readfile)
            const newProduct = {...Object, id: products.length + 1}
            products.push(newProduct)
            await fs.promises.writeFile(this.name, JSON.stringify(products),'utf-8')
        }catch (err){
            throw new Error(`Error al escribir el archivo: ${err}`)
        }
    }

    async getById(Number){
        const products = await this.getAll()
        const filteredProduct = products.filter(e => e.id === Number)
        console.log(filteredProduct)
        return filteredProduct
    }

    async getAll(){
        try {
            const file = await fs.promises.readFile(this.name, 'utf-8')
            // console.log(JSON.parse(file))
            return JSON.parse(file)
        } catch (error) {
            throw new Error(`Error reading file ${error}`)
        }

    }

    async deleteById(Number){
        const products = await this.getAll()
        const filteredProduct = products.filter(e => e.id != Number)
        console.log(filteredProduct)
        await fs.promises.writeFile(this.name, JSON.stringify(filteredProduct),'utf-8')
        return filteredProduct

    }

    async deleteAll() {
        await fs.promises.writeFile(this.name, '','utf-8')
    }
}





