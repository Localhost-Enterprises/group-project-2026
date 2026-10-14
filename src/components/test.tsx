import React, { useEffect, useState } from 'react';
import { getData } from '@/app/supabase/getData';

export default function Test1() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    getData().then((data) => {
      setItems(data);
    });
  }, []);

  return (
    <div>
      {items.map((item) => (
        <div key={item.name}>
          <h4>{item.name}</h4>
          <div>
            {item.fullImageUrls.map((url: string, imgIndex: number) => (
              <img
                key={imgIndex}
                src={url}
                width="100"
                alt=""
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
