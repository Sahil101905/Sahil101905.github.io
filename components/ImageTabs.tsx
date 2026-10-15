"use client";

import { useState } from "react";
import { asset } from "@/lib/site";

export type ImageTab = { id: string; label: string; image: string; alt: string; caption: string };

export default function ImageTabs({ tabs, label }: { tabs: ImageTab[]; label: string }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div className="image-tabs">
      <div className="segmented" role="tablist" aria-label={label}>
        {tabs.map((item, index) => (
          <button type="button" role="tab" aria-selected={index === active} key={item.id} onClick={() => setActive(index)}>{item.label}</button>
        ))}
      </div>
      <figure className="figure" role="tabpanel">
        <img src={asset(tab.image)} alt={tab.alt} />
        <figcaption>{tab.caption}</figcaption>
      </figure>
    </div>
  );
}
