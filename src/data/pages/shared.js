import React from 'react'
import hackclubLogo from '../../assets/hackclub.png'

export const heroMetrics = [
  { label: 'Robotics', value: 'VEX IQ and FRC growth' },
  { label: 'Speaking', value: 'FBLA and Oratorical events' },
  { label: 'Projects', value: 'Python, web, and browser builds' },
]

export const aboutLanguages = ['HTML', 'Python', 'CSS', 'C++']
export const aboutLanguageBadges = [
  { label: 'HTML', signature: '<html>' },
  { label: 'Python', signature: '>>> py' },
  { label: 'CSS', signature: '{ style }' },
  { label: 'C++', signature: 'C++' },
]

export const legacyHTMLExercises = ['Intro', 'Lists', 'Form', 'HTML HW', 'HTML2 HW']

export const quickLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/sahilchess',
    icon: '</>',
  },
  {
    label: 'Hack Club Slack',
    href: 'https://hackclub.enterprise.slack.com/team/U05D9BJD4UC',
    icon: React.createElement('img', { src: hackclubLogo, alt: 'Hack Club', width: 28, height: 28 }),
  },
  {
    label: 'Email',
    href: 'mailto:sahilchess09@gmail.com?subject=Website%20Email',
    icon: '✉',
  },
]

export const homeCards = []
