/**
 * ThemedText Performance Tests
 * 
 * Comprehensive performance testing for text rendering measuring:
 * - Text rendering performance under stress
 * - Typography variant switching performance  
 * - Memory usage patterns for different text variants
 * - Large text content handling
 * - Color switching performance
 */

import { render } from '@testing-library/react-native';
import * as React from 'react';
import {
  measureMemoryUsage,
  measureUpdatePerformance,
  PerformanceProfiler,
  stressTestComponent
} from '../shared/performance.utils';
import { BodyText, CaptionText, DisplayText, HeadlineText, ThemedText } from './index';

describe('ThemedText Performance Tests', () => {
  describe('Render Performance', () => {
    it('should render text consistently under stress (100 iterations)', async () => {
      const testComponent = (
        <ThemedText variant="bodyLarge">Performance test text content</ThemedText>
      );

      const results = await stressTestComponent(testComponent, 100);

      // Performance thresholds for text rendering (should be fast)
      expect(results.averageRenderTime).toBeLessThan(100); // 100ms average (CI-friendly)
      expect(results.maxRenderTime).toBeLessThan(2000); // 2000ms max (CI-friendly)
      expect(results.minRenderTime).toBeLessThan(50); // 50ms min (CI-friendly)

      console.log('📊 ThemedText Render Performance:', {
        average: `${results.averageRenderTime.toFixed(2)}ms`,
        median: `${results.medianRenderTime.toFixed(2)}ms`,
        min: `${results.minRenderTime.toFixed(2)}ms`,
        max: `${results.maxRenderTime.toFixed(2)}ms`
      });
    });

    it('should handle typography variant changes efficiently', () => {
      const variants = ['displayLarge', 'headlineMedium', 'bodyLarge', 'caption'];
      const results = measureUpdatePerformance(
        (props: { variant: any }) => <ThemedText variant={props.variant}>Test text</ThemedText>,
        variants.map(variant => ({ variant }))
      );

      expect(results.averageUpdateTime).toBeLessThan(10); // Typography changes should be very fast

      console.log('🎨 Typography Variant Performance:', {
        average: `${results.averageUpdateTime.toFixed(2)}ms`,
        updates: results.updateTimes.map(t => `${t.toFixed(2)}ms`).join(', ')
      });
    });
  });

  describe('Memory Usage', () => {
    it('should not leak memory during multiple text renders', () => {
      const initialMemory = measureMemoryUsage();
      
      // Render and unmount multiple times
      for (let i = 0; i < 50; i++) {
        const { unmount } = render(
          <ThemedText variant="bodyLarge">Memory test text content {i}</ThemedText>
        );
        unmount();
      }
      
      const finalMemory = measureMemoryUsage();
      
      // Basic memory check (if memory API is available)
      if (initialMemory && finalMemory) {
        const memoryGrowth = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize;
        expect(memoryGrowth).toBeLessThan(1000000); // Less than 1MB growth
        
        console.log('🧠 ThemedText Memory Report:', {
          memoryGrowth: `${(memoryGrowth / 1024).toFixed(2)}KB`,
          hasSignificantGrowth: memoryGrowth > 500000
        });
      } else {
        console.log('🧠 ThemedText Memory Report: Memory API not available in test environment');
      }
    });
  });

  describe('Large Content Performance', () => {
    it('should handle large text content efficiently', async () => {
      // Create large text content (1000 words)
      const largeText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(200);
      
      const profiler = new PerformanceProfiler();
      profiler.start();
      
      const { unmount } = render(
        <ThemedText variant="bodyLarge">{largeText}</ThemedText>
      );
      
      const renderTime = profiler.end();
      unmount();

      // Large text should still render reasonably fast
      expect(renderTime).toBeLessThan(100); // 100ms for large text

      console.log('📚 Large Text Performance:', {
        textLength: largeText.length,
        renderTime: `${renderTime.toFixed(2)}ms`,
        wordsPerMs: (largeText.split(' ').length / renderTime).toFixed(2)
      });
    });

    it('should handle color changes on large text efficiently', () => {
      const largeText = 'Performance test text. '.repeat(100);
      const colors = ['primary', 'secondary', 'error', 'warning'];

      const results = measureUpdatePerformance(
        (props: { color: any }) => <ThemedText color={props.color}>{largeText}</ThemedText>,
        colors.map(color => ({ color }))
      );

      expect(results.averageUpdateTime).toBeLessThan(20); // Color changes should be fast even with large text

      console.log('🎨 Large Text Color Performance:', {
        textLength: largeText.length,
        average: `${results.averageUpdateTime.toFixed(2)}ms`,
        colors: results.updateTimes.map(t => `${t.toFixed(2)}ms`).join(', ')
      });
    });
  });

  describe('Typography Variant Performance', () => {
    it('should render different typography variants efficiently', async () => {
      const variants = [
        { Component: DisplayText, name: 'DisplayText' },
        { Component: HeadlineText, name: 'HeadlineText' },
        { Component: BodyText, name: 'BodyText' },
        { Component: CaptionText, name: 'CaptionText' }
      ];

      const variantPerformance = [];

      for (const { Component, name } of variants) {
        const profiler = new PerformanceProfiler();
        profiler.start();
        
        const { unmount } = render(<Component>Performance test</Component>);
        const renderTime = profiler.end();
        unmount();

        variantPerformance.push({ name, renderTime });
        expect(renderTime).toBeLessThan(50); // Each variant should render quickly
      }

      console.log('📝 Typography Variant Performance:', 
        variantPerformance.reduce((acc, { name, renderTime }) => {
          acc[name] = `${renderTime.toFixed(2)}ms`;
          return acc;
        }, {} as Record<string, string>)
      );
    });
  });

  describe('Concurrent Rendering', () => {
    it('should handle multiple text components rendering simultaneously', async () => {
      const profiler = new PerformanceProfiler();
      profiler.start();

      const promises = Array.from({ length: 10 }, (_, i) => 
        Promise.resolve().then(() => {
          const { unmount } = render(
            <ThemedText variant="bodyLarge" key={i}>
              Concurrent text {i}
            </ThemedText>
          );
          unmount();
        })
      );

      await Promise.all(promises);
      const totalTime = profiler.end();

      expect(totalTime).toBeLessThan(200); // 10 components in under 200ms

      console.log('🚀 Concurrent Text Render Performance:', {
        totalTime: `${totalTime.toFixed(2)}ms`,
        averagePerComponent: `${(totalTime / 10).toFixed(2)}ms`
      });
    });
  });

  describe('Component Size Analysis', () => {
    it('should have minimal runtime overhead', () => {
      const component = <ThemedText variant="bodyLarge">Size test</ThemedText>;
      const stringified = JSON.stringify(component);
      
      // Text components should be lightweight
      expect(stringified.length).toBeLessThan(500); // Less than 500 characters when stringified

      console.log('📦 ThemedText Size Analysis:', {
        stringifiedSize: `${(stringified.length / 1024).toFixed(2)}KB`
      });
    });
  });
});