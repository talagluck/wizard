import { Box } from 'ink';
import type { ReactNode } from 'react';
import { Colors } from '@ui/tui/styles';
import type { ContentBlock } from '@ui/tui/primitives/index';

/** Slide shape consumed by `AuditAreaPane`. One per `AuditCheck.area` value. */
export interface AreaSlide {
  area: string;
  /** Played through `ContentSequencer`. Plain strings render one paragraph
   * per block; use the object/clear forms for per-block pacing overrides
   * (mode, pause) or to page-break a longer deck into scenes. */
  intro: ContentBlock[];
  visual?: ReactNode;
  docsUrl: string;
}

/** Narrow bordered box for the small ASCII illustrations in baseline slides. */
export const VisualBox = ({ children }: { children: ReactNode }) => (
  <Box
    borderStyle="single"
    borderColor={Colors.muted}
    paddingX={1}
    flexDirection="column"
    marginBottom={1}
  >
    {children}
  </Box>
);
