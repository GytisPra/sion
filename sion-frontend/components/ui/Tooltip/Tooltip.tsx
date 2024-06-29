import { useState, ReactNode } from 'react';
import styled from 'styled-components';

interface TooltipProps {
  children: ReactNode;
  direction?: string;
  content: string;
}

interface TooltipContentProps {
  direction: string;
  content: string;
  className?: string;
}

const StyledTooltip = styled.div`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
`;

const TooltipContent = ({
  direction,
  content,
  className,
}: TooltipContentProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={`${className} ${direction}`}
    />
  );
};

const StyledTooltipContent = styled(TooltipContent)<TooltipContentProps>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  line-height: 1rem;

  padding: 0.75rem 1rem;

  white-space: nowrap;

  color: black;
  background: white;

  border: 2px solid ${(props) => props.theme.colors.accent};
  border-radius: 3px;

  &.top {
    bottom: calc(100% + 10px);
  }

  &.right {
    left: calc(100% + 10px);
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }

  &.left {
    left: auto;
    right: calc(100% + 10px);
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }
`;

const Tooltip = ({ children, direction = 'top', content }: TooltipProps) => {
  let timeout: NodeJS.Timeout;

  const [active, setActive] = useState(false);

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 400);
  };

  const hideTooltip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <StyledTooltip onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {active && (
        <StyledTooltipContent direction={direction} content={content} />
      )}
    </StyledTooltip>
  );
};

export default Tooltip;
