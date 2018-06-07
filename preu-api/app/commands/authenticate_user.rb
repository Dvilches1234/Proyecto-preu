class AuthenticateUser
  prepend SimpleCommand

  def initialize(rut, password)
    @rut = rut
    @password = password
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  attr_accessor :rut, :password

  def user
    user = User.find_by_rut(rut)
    return user if user && user.authenticate(password)

    errors.add :user_authentication, 'invalid credentials'
    nil
  end
end
