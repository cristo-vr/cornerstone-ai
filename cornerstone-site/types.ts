export interface NavItem {
  label: string;
  href: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  tag: string;
  image: string;
}

export interface ProcessStep {
  phase: string;
  title: string;
  duration: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}