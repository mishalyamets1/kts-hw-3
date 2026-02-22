import styles from '../SingleCard/SingleCard.module.scss'
import Text from 'components/ui-kit/Text'

const About= () => {
  return (
    <div className={styles.singleCard}>
      <Text view='title' color='primary'>About</Text>
    </div>
  )
}

export default About
