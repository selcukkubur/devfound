import { FC } from 'react'

interface PlaceholderImageProps {
  text?: string
  width: number
  height: number
  className?: string
}

export const PlaceholderImage: FC<PlaceholderImageProps> = ({ text, width, height, className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100%" height="100%" fill="#e2e8f0" />
      {text && (
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={width * 0.4}
          fontFamily="Arial, sans-serif"
          fill="#94a3b8"
        >
          {text}
        </text>
      )}
    </svg>
  )
}
