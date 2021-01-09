const PRIORITY_COLORS = {
  1: '#ee9595',
  2: '#ffcda3',
  3: '#74c7b8'
}

export function getPriorityColor(priority) {
  return PRIORITY_COLORS[priority];
}
