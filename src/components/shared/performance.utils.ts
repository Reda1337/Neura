/**
 * Performance Testing Utilities
 * 
 * Modern performance testing without deprecated packages
 * Measures render times, memory usage, and interaction responsiveness
 */

import { render, fireEvent, screen } from '@testing-library/react-native';
import * as React from 'react';

/**
 * Performance measurement utility
 */
export class PerformanceProfiler {
  private startTime: number = 0;
  private measurements: number[] = [];

  start() {
    this.startTime = performance.now();
  }

  end() {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    this.measurements.push(duration);
    return duration;
  }

  getAverageTime() {
    return this.measurements.reduce((a, b) => a + b, 0) / this.measurements.length;
  }

  getMedianTime() {
    const sorted = this.measurements.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  reset() {
    this.measurements = [];
  }
}

/**
 * Memory usage measurement (using modern APIs)
 */
export function measureMemoryUsage() {
  // Use modern performance API if available
  if ('memory' in performance) {
    return {
      usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
      totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
      jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
    };
  }
  return null;
}

/**
 * Stress test utility - renders components multiple times
 */
export async function stressTestComponent(
  component: React.ReactElement,
  iterations: number = 100
) {
  const profiler = new PerformanceProfiler();
  const renderTimes: number[] = [];

  for (let i = 0; i < iterations; i++) {
    profiler.start();
    const { unmount } = render(component);
    const renderTime = profiler.end();
    renderTimes.push(renderTime);
    unmount();
  }

  return {
    averageRenderTime: profiler.getAverageTime(),
    medianRenderTime: profiler.getMedianTime(),
    minRenderTime: Math.min(...renderTimes),
    maxRenderTime: Math.max(...renderTimes),
    totalIterations: iterations,
  };
}

/**
 * Interaction responsiveness test
 */
export async function measureInteractionLatency(
  component: React.ReactElement,
  interactionSelector: string,
  interactionType: 'press' | 'changeText' = 'press'
) {
  render(component);
  const element = screen.getByTestId(interactionSelector);
  
  const profiler = new PerformanceProfiler();
  profiler.start();
  
  if (interactionType === 'press') {
    fireEvent.press(element);
  }
  
  const latency = profiler.end();
  return latency;
}

/**
 * Component update performance test
 */
export function measureUpdatePerformance<T extends Record<string, any>>(
  ComponentToTest: React.ComponentType<T>,
  propsSequence: T[]
) {
  const profiler = new PerformanceProfiler();
  const { rerender } = render(React.createElement(ComponentToTest, propsSequence[0]));
  
  const updateTimes: number[] = [];
  
  for (let i = 1; i < propsSequence.length; i++) {
    profiler.start();
    rerender(React.createElement(ComponentToTest, propsSequence[i]));
    updateTimes.push(profiler.end());
  }
  
  return {
    averageUpdateTime: updateTimes.reduce((a, b) => a + b, 0) / updateTimes.length,
    updateTimes,
  };
}