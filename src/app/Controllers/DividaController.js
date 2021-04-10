const Divida = require('../Models/Divida');
const yup = require('yup');
const moment = require('moment');

class DividaController{

   async index(request, response){

      const dividas = await Divida.find();

        return response.status(200).json({
            error: false,
            dividas
        });

    }

    async store(request, response){

        // Validando a requisição com o YUP schema
   
        let validator = yup.object().shape({
            user_id: yup.number().required().integer(),
            motivo_divida: yup.string().required(),
            valor: yup.string().required(),
            data_divida: yup.date()
          });

        if(!await validator.isValid(request.body)){
            return response.status(400).json({
                error: true,
                message: "Verifique se os campos estão corretos"
            });
        }
         
            // Desestruturando a requisição e inserindo dentro de um objeto

        const { user_id, motivo_divida, data_divida, valor} = request.body;

        const data = {
            user_id,
            motivo_divida,
            data_divida,
            valor
        }

        // Inserindo a dívida no banco de dados MongoDb

        await Divida.create(data,(err) => {

            if(err){
                return response.status(400).json({
                    error: true,
                    message: "Erro ao tentar cadastrar a dívida"
                });
            }

            return response.status(200).json({
                error: false,
                message: "Dívida cadastrada com sucesso"
            });
        });
    }

    async update(request, response){

        const id_divida = request.params.id_divida;

        const {user_id, motivo_divida, data_divida, valor} = request.body;

        const data = {
            user_id,
            motivo_divida,
            data_divida,
            valor
        }

        const divida = await Divida.findByIdAndUpdate({_id:id_divida}, data, {new: true});
        
        return response.status(200).json({
            error: false,
            message: "Dados atualizados com sucesso",
            divida
        });
    }


    async search(request, response){

        const user_id = request.params.user_id;
        
        const dividas =  await Divida.find({
            user_id: parseInt(user_id)
        });

        return response.status(200).json({
            error: false,
            dividas
        });

    }

    async showDetails(request, response){
        const id_divida = request.params.id_divida;

        const divida = await Divida.findById({_id: id_divida});

        return response.status(200).json({
            error: false,
            divida
        });

    }

    async destroy(request, response){

        const id_divida = request.params.id_divida;

         await Divida.deleteOne({ _id: id_divida }, function (err) {
            if (err){
                return response.status(400).json({
                    error: true,
                    message:handleError(err) 
                })
            }

            return response.status(200).json({
                error: false,
                message: "Divida removida com sucesso",
            })   

          });  
    }

}

module.exports = new DividaController();