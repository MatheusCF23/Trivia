import React from 'react';

const OBJ = {
  disable: true,
  name: '',
  email: '',
};

class Login extends React.Component {
  state = { ...OBJ };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => this.buttonValid());
  };

  buttonValid = () => {
    const { email, name } = this.state;
    const cod = /\S+@\S+\.\S+/;
    const emailCheck = cod.test(email);
    const nameCheck = name.length > 0;
    const validate = emailCheck && nameCheck;
    this.setState({ disable: !validate });
  };

  render() {
    const { disable, name, email } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="input-player-name"
            placeholder="Name"
            type="text"
            value={ name }
            name="name"
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            placeholder="Email"
            type="email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disable }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
