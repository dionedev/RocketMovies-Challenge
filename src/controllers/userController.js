const { hash, compare } = require("bcryptjs")
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

    const encryptedPassword = await hash(password, 8)
    
    await knex("users").insert(
      { 
        name,
        email,
        password: encryptedPassword
      }
    )

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

    const user = await knex("users").where({ id: user_id }).first()
    
    if(!user) {
      throw new ErrorHandling("Não foi possível encontrar este usuário", 404)
    }

    const userWithEmail = await knex('users').where({ email: updated_email }).first();
    
    if(userWithEmail && userWithEmail.id !== user.id) {
      throw new ErrorHandling("Este email não está disponível.")
    }

    user.name = updated_name ?? user.name
    user.email = updated_email ?? user.email

    if(!current_password && updated_password) {
      throw new ErrorHandling("Por favor, informe a senha atual para definir uma nova senha")
    }

    if(current_password && updated_password) {
      const checkCurrentPassword = await compare(current_password, user.password)

      if(!checkCurrentPassword) {
        throw new ErrorHandling("A senha digitada não confere com a senha atual")
      }

      user.password = await hash(updated_password, 8)
    }

    await knex("users")
    .update(
      {
        name: updated_name,
        email: updated_email,
        password: user.password,
        updated_at: knex.fn.now()
      }
    ).where({ id: user_id })

    response.status(200).json({ message: "Usuário atualizado com sucesso"})
  } 

  async deleteUser(request, response) {
    const { user_id } = request.params

    await knex("users").delete().where({ id: user_id })

    response.status(200).json({ message: "Usuário deletado com sucesso."})
  }
}
module.exports = UserController