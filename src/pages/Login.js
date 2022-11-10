import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import reqApi from '../service/Api';
import { addPlayer } from '../redux/action';

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

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const resultApi = await reqApi();
    localStorage.setItem('token', resultApi.token);
    history.push('/game');
    dispatch(addPlayer(this.state));
  };

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { disable, name, email } = this.state;
    return (
      <div>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleSettings }
        >
          Settings
        </button>
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
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
