import { Html } from "@elysiajs/html";


type BadgeColor = 'blue' | 'gray' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink';

interface PillBadgeProps {
  className?: string
  color?: BadgeColor
  text: string
}

const baseClasses = 'cursor-pointer'
const colorClasses = {
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
};



function getColorClasses(color: BadgeColor) {
  return colorClasses[color]
}

export function InlineBadge(props: {
  color: BadgeColor,
  children: any
}) {
  return (
    <span class={"inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold rounded-full "+getColorClasses(props.color)}>
      {props.children}
    </span>
  )
}


const hashStringToColor = (text: string): BadgeColor => {
  const colors: BadgeColor[] = ['blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink'];
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export function PillBadge({ className='', text, color }: PillBadgeProps) {
  return (
    <span 
      class={`rounded-full mr-1 px-2 ${baseClasses} `+getColorClasses(color??hashStringToColor(text)) + " " + className}>
      {text}
    </span>
  );

}

