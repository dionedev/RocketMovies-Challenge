const knex = require("../database/knex")
const ErrorHandling = require("../utils/errorHandling")

class UserController {
  async createUser(request, response) {
    const { name, email, password } = request.body

    const checkUserExists = await knex("users")
    .select("email")
    .where("email", "=", email)
    .first()

    if(checkUserExists) {
      throw new ErrorHandling("Este email já está sendo utilizado")
    }
    
    await knex("users").insert({ name, email, password })

    return response.status(201).json({
      message: "Usuário cadastrado com sucesso"
    })
  }

  async showUserById(request, response) {
    const { user_id } = request.params

    const user = await knex("users").where({ id: user_id })
    
    if(!user.length) {
      throw new ErrorHandling("Não foi possível encontrar este usuário", 404)
    }

    response.status(200).json({ user })
  }

  async updateUser(request, response) {
    const { user_id } = request.params
    const { updated_name, updated_email, current_password, updated_password } = request.body

    const user = await knex("users").where({ id: user_id })
    
    if(!user.length) {
      throw new ErrorHandling("Não foi possível encontrar este usuário", 404)
    }

    const userWithEmail = await knex('users').where({ email: updated_email }).first();

    if(userWithEmail && userWithEmail.id !== user.id) {
      throw new ErrorHandling("Este email não está disponível.")
    }

    await knex("users")
    .update(
      {
        name: updated_name,
        email: updated_email,
        updated_at: new Date()
      }
    ).where({ id: user_id })

    if(!current_password && updated_password) {
      throw new ErrorHandling("Por favor, informe a senha atual para definir uma nova senha", 400)
    }

    response.status(200).json({ message: "Usuário atualizado com sucesso"})
  } 

  async deleteUser(request, response) {
    const { user_id } = request.params

    await knex("users").delete().where({ id: user_id })

    response.status(200).json({ message: "Usuário deletado com sucesso."})
  }
}
module.exports = UserController