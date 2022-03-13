import Countdown from 'components/Countdown'

export default function Remote() {
  const onDevelopment = process.env.NODE_ENV !== 'production'

  return (
    <div>
      this is test
      <Countdown seconds={1}/>
    </div>
  )
}
