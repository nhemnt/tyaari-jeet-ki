import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Button from './index';
import { expect, vi } from 'vitest';


describe('Button Component', () => {
  test("render button with text", () => {
    render(<Button text="Hemant negi" />);
    const buttonElement = screen.getByText(/Hemant negi/i);
    expect(buttonElement).toBeInTheDocument()
  })
  test("calls onCLick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button text="Hemant negi" onClick={handleClick} />);
    const buttonElement = screen.getByText(/Hemant negi/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toBeCalledTimes(1);

  })

  test("button is disabled when disabled prop is true", () => {
    render(<Button text="Hemant negi" disabled />);
    const buttonElement = screen.getByText(/Hemant negi/i);
    expect(buttonElement).toBeDisabled()

  })
  test("button shows loading when loading prop is true", () => {
    render(<Button text="Hemant negi" loading />);
    const buttonElement = screen.getByText(/loading/i);
    expect(buttonElement).toBeInTheDocument();

  })
  test("button has correct type attribute", () => {
    render(<Button text="Hemant negi" type="submit" />);
    const buttonElement = screen.getByText(/hemant negi/i);
    expect(buttonElement).toHaveAttribute("type", "submit")
  })
  test("button has custom className", () => {
    render(<Button text="Hemant negi" className="custom-class" />);
    const buttonElement = screen.getByText(/hemant negi/i);
    expect(buttonElement).toHaveClass("custom-class")
  })
  test("button is not clickable when loading", () => {
    const fn = vi.fn();
    render(<Button text="Hemant negi" onClick={fn} loading />);
      const buttonElement = screen.getByText(/loading/i);

    fireEvent.click(buttonElement);

    expect(fn).not.toHaveBeenCalled()

  })
  test("render button with icon before text", () => {
    render(<Button text="Click Me" icon={<span>Icon</span>} iconPosition="before" />);
    const buttonElement = screen.getByText(/click me/i);
    const iconElement = screen.getByText(/icon/i);
    expect(buttonElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
    expect(buttonElement.lastChild).toHaveTextContent('Click Me');
  })
  test("render button with icon after text", () => {
    render(<Button text="Click Me" icon={<span>Icon</span>} iconPosition="after" />);
    const buttonElement = screen.getByText(/click me/i);
    const iconElement = screen.getByText(/icon/i);
    expect(buttonElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
    expect(buttonElement.lastChild).toHaveTextContent('Icon');
  })
});