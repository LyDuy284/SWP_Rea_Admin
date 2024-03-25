import type { SignInCredential, SignUpCredential } from '@/@types/auth'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { apiGetMe, apiSignIn } from '@/services/AuthService'
import {
  setUser,
  signInSuccess,
  signOutSuccess,
  useAppDispatch,
  useAppSelector,
} from '@/store'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'

type Status = 'success' | 'failed'

function useAuth() {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const query = useQuery()

  const { access_token, refresh_token, signedIn } = useAppSelector(
    (state) => state.auth.session
  )

  const signIn = async (
    values: SignInCredential
  ): Promise<
    | {
        status: Status
        message: string
        exceptionMessage: string
      }
    | undefined
  > => {
    try {
      const { data } = await apiSignIn(values)
      if (data) {
        dispatch(
          signInSuccess({
            access_token: data.result.accessToken,
            refresh_token: '',
          })
        )
        dispatch(setUser(data.result))
        const redirectUrl = query.get(REDIRECT_URL_KEY)
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
        return {
          status: 'success',
          message: '',
          exceptionMessage: '',
        }
      }
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.message || errors.toString(),
        exceptionMessage:
          errors?.response?.data?.responseException?.exceptionMessage,
      }
    }
  }

  const signUp = async (values: SignUpCredential) => {
    try {
      alert('Signup Clicked')
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (errors: any) {
      return {
        status: 'failed',
        message: errors?.response?.data?.message || errors.toString(),
      }
    }
  }

  const handleSignOut = () => {
    dispatch(signOutSuccess())
    dispatch(
      setUser({
        avatarUrl: '',
        username: '',
        authority: [],
        email: '',
      })
    )
    navigate(appConfig.unAuthenticatedEntryPath)
  }

  const signOut = async () => {
    handleSignOut()
  }

  return {
    authenticated: access_token && signedIn,
    signIn,
    signUp,
    signOut,
  }
}

export default useAuth
