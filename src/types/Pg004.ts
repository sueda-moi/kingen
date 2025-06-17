import { ReactElement } from 'react';

/**
 * iconMap 对应的 key 类型（与多语言 ID 对应）
 */
export type IconKey =
  | 'real_estate_sales'
  | 'development'
  | 'housing'
  | 'tourism'
  | 'staffing'
  | 'it_consulting'
  | 'international_trade'
  | 'design'
  | 'consulting'
  | 'solution'
  | 'collab'
  | 'dx'
  | 'newbiz'
  | 'it_development'
  | 'web_solution'
  | 'global_biz'
  | 'startup';

/**
 * Pg004 页面左侧导航栏每个链接项的类型
 */
export type MenuItem = {
  id: IconKey;
  label: string;
};

/**
 * section 数据的结构（右侧每一块业务内容区域）
 */
export type SectionCardGroup = {
  title: string;
  cards: string[]
  category?: 'main' | 'solution' | 'evolution';
};

/**
 * sectionsData 的整体结构，key 为 section ID
 */
export type SectionData = Record<string, SectionCardGroup>;

/**
 * iconMap 的类型定义：key 是 IconKey，value 是 ReactElement
 */
export type IconMap = Record<IconKey, ReactElement>;
