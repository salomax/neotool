import '../src/styles/themes/AppThemeProvider'
import '../src/shared/providers'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
