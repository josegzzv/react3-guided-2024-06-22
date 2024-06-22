import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
const SignupPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')
    const [failure, setFailure] = useState('')
    function handleUserNameChange (event) {
        setSuccess('')
        setFailure('')
        setUsername(event.target.value)
    }
    function handlePasswordChange (event) {
        setSuccess('')
        setFailure('')
        setPassword(event.target.value)
    }
    function handleConfirmChange (event) {
        setSuccess('')
        setFailure('')
        setConfirm(event.target.value)
    }
    function handleEmailChange (event) {
        setSuccess('')
        setFailure('')
        setEmail(event.target.value)
    }
    function handleSubmit (event) {
        event.preventDefault()
        const missingUsername = username === ''
        const missingPassword = password === ''
        const missingConfirm = confirm === ''
        const missingEmail = email === ''
        const missing = missingUsername || missingPassword || missingConfirm || missingEmail
        if (missing) {
            setFailure('Missing data')
            return
        }
        const passwordsMatch = password === confirm
        if (!passwordsMatch) {
            setFailure('Passwords do not match')
            return
        }
        const localCredentials = localStorage.getItem('credentials')
        const credentials = JSON.parse(localCredentials)
        if (username in credentials) {
            setFailure('Username already taken')
            return
        }
        credentials[username] = password
        const credentialsString = JSON.stringify(credentials)
        localStorage.setItem('credentials', credentialsString)
        const localUsers = localStorage.getItem('users')
        const users = JSON.parse(localUsers)
        const newUser = {
            username, password, email, isAdmin: false
        }
        users.push(newUser)
        const usersString = JSON.stringify(users)
        localStorage.setItem('users', usersString)
        setFailure('')
        setSuccess('Successfully registered')
    }

    return (
        <Form onSubmit={handleSubmit}>
            {failure && (
                <AlertMessage
                    variant='danger'
                    message={failure}
                />
            )}
            {success && (
                <AlertMessage
                    variant='success'
                    message={success}
                />
            )}
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    value={username}
                    onChange={handleUserNameChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    value={email}
                    onChange={handleEmailChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    value={confirm}
                    onChange={handleConfirmChange}
                />
            </Form.Group>
            <Button type='submit'>Register</Button>
        </Form>
    )
}

export default SignupPage;
