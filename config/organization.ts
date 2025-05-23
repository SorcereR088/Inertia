export const activeCookieName = 'active-organization'

export const defaults = {
  accessLevels: [
    {
      name: 'Free',
      color: '#6ee7b7',
      order: 0,
    },
    {
      name: 'Paid',
      color: '#67e8f9',
      order: 1,
    },
  ],

  difficulties: [
    {
      name: 'Easy',
      color: '#6ee7b7',
      is_default: true,
      order: 0,
    },

    {
      name: 'Medium',
      color: '#67e8f9',
      is_default: false,
      order: 1,
    },

    {
      name: 'Hard',
      color: '#a5b4fc',
      is_default: false,
      order: 2,
    },

    {
      name: 'Expert',
      color: '#f0abfc',
      is_default: false,
      order: 3,
    },
  ],
  statuses: [
    {
      name: 'Not Started',
      color: '#cbd5e1',
      is_default: true,
      order: 0,
    },

    {
      name: 'Planned',
      color: '#f0abfc',
      is_default: false,
      order: 1,
    },

    {
      name: 'Recorded',
      color: '#a5b4fc',
      is_default: false,
      order: 2,
    },

    {
      name: 'Edited',
      color: '#67e8f9',
      is_default: false,
      order: 4,
    },

    {
      name: 'Done',
      color: '#6ee7b7',
      is_default: false,
      order: 5,
    },
  ],
}
