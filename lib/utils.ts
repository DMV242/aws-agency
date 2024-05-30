import React from 'react'
import { FormData } from '@/components/contact';

export default function sendEmail(data: FormData) {

    const response = fetch('api/email', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => {
          alert(response.message);
        })
        .catch((err) => {
          alert(err);
        });
}
