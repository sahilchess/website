import { aboutLanguageBadges } from './shared'

export const aboutPageData = {
  title: 'about',
  eyebrow: 'about',
  description: 'A short writing-style page for background, interests, and long-term goals.',
  sections: [
    {
      title: 'Background',
      blocks: [
        {
          type: 'paragraph',
          text: 'I am a student from Georgia with a strong interest in robotics, programming, and technical problem solving.',
        },
        {
          type: 'paragraph',
          text: 'My VEX IQ team has been very successful, and in my second year we qualified for the VEX IQ Robotics World Championship. That experience helped me grow by working with technical teams from around the world and earning the Innovative Award at the championship. I plan to compete in FRC to deepen my skills in design, programming, and engineering collaboration. I also compete in FBLA Speaking Events and the Optimist Oratorical, where I have earned Top 3 awards at the state and national level.',
        },
        {
          type: 'paragraph',
          text: 'I am part of Hack Club, where I have built many projects that strengthen my interest in using technology to create meaningful solutions.',
        },
      ],
    },
    {
      title: 'Education and Interests',
      blocks: [
        {
          type: 'paragraph',
          text: 'I am a high school student with a strong interest in engineering, programming, and technical communication.',
        },
        { type: 'subheading', text: 'Hobbies' },
        {
          type: 'paragraph',
          text: 'Chess, percussion, reading, writing, sketching, photography, visual design, and academic olympiads.',
        },
        { type: 'subheading', text: 'Programming Languages Known' },
        { type: 'badges', items: aboutLanguageBadges },
        { type: 'subheading', text: 'Long-Term Goals' },
        {
          type: 'list',
          items: [
            'Build a startup that solves a real technical problem',
            'Attend an Ivy League university',
            'Keep improving through robotics, coding, and olympiads',
          ],
          className: 'feature-list',
        },
      ],
    },
    {
      title: 'Goals',
      blocks: [
        {
          type: 'paragraph',
          text: 'I want to keep growing as a technical leader by competing in FRC, strengthening my programming and engineering skills, building startup ideas, and learning from ambitious people who work on hard problems.',
        },
        {
          type: 'list',
          items: [
            'Build a startup around a real technical problem',
            'Earn admission to an Ivy League university',
            'Keep developing advanced robotics and software skills',
          ],
          className: 'feature-list',
        },
      ],
    },
    {
      title: 'Olympiad Mindset',
      blocks: [
        {
          type: 'paragraph',
          text: 'I like olympiads because they reward deep thinking, precision, and consistent effort. They match the same kind of focus I enjoy in robotics, coding, and speaking events.',
        },
      ],
    },
  ],
}
