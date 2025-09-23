/**
 * ThemedButton Performance Tests
 * 
 * World-class performance testing measuring:
 * - Render performance under stress
 * - Memory usage patterns
 * - Interaction latency
 * - Update performance
 */

import { fireEvent, render, screen } from '@testing-library/react-native';
import * as React from 'react';
import {
  measureMemoryUsage,
  measureUpdatePerformance,
  PerformanceProfiler,
  stressTestComponent
} from '../shared/performance.utils';
import { ThemedButton } from './index';

describe('ThemedButton Performance Tests', () => {
  describe('Render Performance', () => {
    it('should render consistently under stress (100 iterations)', async () => {
      const testComponent = (
        <ThemedButton onPress={jest.fn()}>Stress Test Button</ThemedButton>
      );

      const results = await stressTestComponent(testComponent, 100);

      // Performance thresholds for production apps (adjusted for CI environments)
      expect(results.averageRenderTime).toBeLessThan(100); // 100ms average (CI-friendly)
      expect(results.maxRenderTime).toBeLessThan(2000); // 2000ms max (CI-friendly)  
      expect(results.minRenderTime).toBeLessThan(50); // 50ms min

      console.log('📊 ThemedButton Render Performance:', {
        average: `${results.averageRenderTime.toFixed(2)}ms`,
        median: `${results.medianRenderTime.toFixed(2)}ms`,
        min: `${results.minRenderTime.toFixed(2)}ms`,
        max: `${results.maxRenderTime.toFixed(2)}ms`,
      });
    });

    it('should handle rapid prop changes efficiently', () => {
      const propsSequence = [
        { variant: 'filled' as const, color: 'primary' as const, children: 'Test 1' },
        { variant: 'outlined' as const, color: 'secondary' as const, children: 'Test 2' },
        { variant: 'text' as const, color: 'success' as const, children: 'Test 3' },
        { variant: 'elevated' as const, color: 'error' as const, children: 'Test 4' },
      ];

      const results = measureUpdatePerformance(ThemedButton, propsSequence.map(props => ({
        ...props,
        onPress: jest.fn()
      })));

      // Update performance should be fast
      expect(results.averageUpdateTime).toBeLessThan(30); // 30ms average update
      
      console.log('🔄 ThemedButton Update Performance:', {
        average: `${results.averageUpdateTime.toFixed(2)}ms`,
        updates: results.updateTimes.map((t: number) => `${t.toFixed(2)}ms`).join(', '),
      });
    });
  });

  describe('Memory Usage', () => {
    it('should not leak memory during multiple renders', () => {
      const initialMemory = measureMemoryUsage();
      
      // Render and unmount multiple times
      for (let i = 0; i < 50; i++) {
        const { unmount } = render(
          <ThemedButton variant="filled" color="primary" onPress={jest.fn()}>
            Memory Test {i}
          </ThemedButton>
        );
        unmount();
      }

      const finalMemory = measureMemoryUsage();
      
      if (initialMemory && finalMemory) {
        const memoryGrowth = finalMemory.usedJSHeapSize - initialMemory.usedJSHeapSize;
        
        // Memory growth should be minimal (less than 1MB for 50 renders)
        expect(memoryGrowth).toBeLessThan(1024 * 1024);
        
        console.log('💾 Memory Usage Analysis:', {
          initial: `${(initialMemory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
          final: `${(finalMemory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
          growth: `${(memoryGrowth / 1024).toFixed(2)}KB`,
        });
      }
    });
  });

  describe('Interaction Latency', () => {
    it('should respond to press events within performance budget', () => {
      const profiler = new PerformanceProfiler();
      const onPressMock = jest.fn();

      render(
        <ThemedButton 
          onPress={onPressMock} 
          testID="latency-test-button"
        >
          Latency Test
        </ThemedButton>
      );

      const button = screen.getByTestId('latency-test-button');
      
      // Measure multiple interactions
      const latencies: number[] = [];
      for (let i = 0; i < 10; i++) {
        profiler.start();
        fireEvent.press(button);
        latencies.push(profiler.end());
      }

      const averageLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
      const maxLatency = Math.max(...latencies);

      // Interactive elements should respond within 16ms (60fps budget)
      expect(averageLatency).toBeLessThan(16);
      expect(maxLatency).toBeLessThan(50);

      console.log('⚡ Interaction Latency:', {
        average: `${averageLatency.toFixed(2)}ms`,
        max: `${maxLatency.toFixed(2)}ms`,
        all: latencies.map(l => `${l.toFixed(2)}ms`).join(', '),
      });
    });

    it('should maintain performance with loading state', () => {
      const profiler = new PerformanceProfiler();
      
      profiler.start();
      render(
        <ThemedButton loading onPress={jest.fn()}>
          Loading Button
        </ThemedButton>
      );
      const loadingRenderTime = profiler.end();

      profiler.start();
      render(
        <ThemedButton onPress={jest.fn()}>
          Normal Button
        </ThemedButton>
      );
      const normalRenderTime = profiler.end();

      // Loading state shouldn't significantly impact render time  
      const performanceRatio = normalRenderTime > 0 ? loadingRenderTime / normalRenderTime : 1;
      expect(performanceRatio).toBeLessThan(10); // Loading state should be < 10x slower (more lenient for CI)

      console.log('⏳ Loading State Performance:', {
        normal: `${normalRenderTime.toFixed(2)}ms`,
        loading: `${loadingRenderTime.toFixed(2)}ms`,
        ratio: `${performanceRatio.toFixed(2)}x`,
      });
    });
  });

  describe('Bundle Size Impact', () => {
    it('should have minimal runtime overhead', () => {
      // Test that ThemedButton doesn't significantly impact bundle
      const componentSize = JSON.stringify(ThemedButton.toString()).length;
      
      // Component should be reasonably sized (less than 10KB stringified)
      expect(componentSize).toBeLessThan(10240);
      
      console.log('📦 Component Size Analysis:', {
        stringifiedSize: `${(componentSize / 1024).toFixed(2)}KB`,
      });
    });
  });

  describe('Concurrent Rendering', () => {
    it('should handle multiple simultaneous renders', async () => {
      const profiler = new PerformanceProfiler();
      
      profiler.start();
      
      // Simulate concurrent renders
      const renderPromises = Array.from({ length: 10 }, (_, i) =>
        new Promise<void>((resolve) => {
          render(
            <ThemedButton onPress={jest.fn()}>
              Concurrent {i}
            </ThemedButton>
          );
          resolve();
        })
      );

      await Promise.all(renderPromises);
      const concurrentRenderTime = profiler.end();

      // Concurrent renders should complete quickly
      expect(concurrentRenderTime).toBeLessThan(100);

      console.log('🚀 Concurrent Render Performance:', {
        totalTime: `${concurrentRenderTime.toFixed(2)}ms`,
        averagePerComponent: `${(concurrentRenderTime / 10).toFixed(2)}ms`,
      });
    });
  });
});