import { useState } from 'react'
import { PropTypes } from 'prop-types'
import Input from 'components/Input'
import Button from 'components/Button'
import ErrorBox from 'components/ErrorBox'
import ConfirmEmail from 'subviews/auth/ConfirmEmail'
import validate, { tests } from 'utils/validate'
import styles from 'theme/pages/signup.module.scss'
import { path } from 'utils/const'

const customTests = {
  ...tests,
  fullName: {
    test: tests.name.test,
    error: 'Please input full name',
  },
}

function Signup({ history }) {
  // ------------------------------------
  // State
  // ------------------------------------
  const [input, setInput] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState({})
  const [resErr, setResError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)

  // ------------------------------------
  // Handlers
  // ------------------------------------
  const handleOnChange = ({ target: { name, value } }) => {
    setInput((prev) => ({ ...prev, [name]: value }))
    setError((prev) => ({ ...prev, [name]: '' }))
    setResError('')
  }

  const handleSubmit = async () => {
    // validation
    const result = validate(input, customTests)
    setError(result.errors)
    if (result.isError) return

    // confirm password
    if (input.password !== input.confirmPassword) {
      setError({
        password: 'Password do not match',
        confirmPassword: 'Password do not match',
      })
      return
    }

    // Signup action
    setLoading(true)
    // actions
    //   .Signup(input.email, input.password)
    //   .then((user) => {
    //     onFinish(user)
    //     setLoading(false)
    //     setResError('')
    //   })
    //   .catch((err) => {
    //     setResError(err.message)
    //     setLoading(false)
    //   })
  }

  return (
    <div className={styles.root}>
      {resErr && <ErrorBox>{resErr}</ErrorBox>}
      <h2 className={styles.title}>Signup</h2>
      <Input
        label="Full Name"
        name="fullName"
        placeholder="John Doe"
        value={input.fullName}
        onChange={handleOnChange}
        error={error.fullName}
      />
      <Input
        label="Email"
        name="email"
        placeholder="email@example.com"
        value={input.email}
        onChange={handleOnChange}
        error={error.email}
      />
      <Input
        type="password"
        label="Password"
        name="password"
        placeholder="password1234"
        value={input.password}
        onChange={handleOnChange}
        error={error.password}
      />
      <Input
        type="password"
        label="Confirm Password"
        name="password"
        placeholder="password1234"
        value={input.confirmPassword}
        onChange={handleOnChange}
        error={error.confirmPassword}
      />
      <br />
      <Button
        label="Signup"
        className={`btn-black-fill ${styles.submitButton}`}
        onClick={handleSubmit}
        isLoading={isLoading}
      />
      <div className={styles.footerContainer}>
        <div className={styles.textContainer}>
          You have account?{' '}
          <Button
            label="Log in"
            className={styles.linkButton}
            onClick={() => history.push(path.login)}
          />
        </div>
        <div className={styles.textContainer}>
          Forget{' '}
          <Button
            label="Password"
            className={styles.linkButton}
            onClick={() => history.push(path.resetPassword)}
          />
          ?
        </div>
      </div>
      <ConfirmEmail
        email={input.email}
        isOpen={isOpen}
        toggle={() => setOpen((prev) => !prev)}
      />
    </div>
  )
}

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}

Signup.defaultProps = {
  history: {
    push: () => null,
  },
}

export default Signup
