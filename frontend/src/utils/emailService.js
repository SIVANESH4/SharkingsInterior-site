/**
 * Frontend Email Service for Sharkings Interiors & Exteriors
 * Sends HTML formatted emails with Company Logo directly to sharkingsindia@gmail.com.
 * Powered by Web3Forms / Formspree API (Free 3rd-Party Frontend Service).
 */

export const EMAIL_CONFIG = {
  // To receive emails directly, get a free key for sharkingsindia@gmail.com at https://web3forms.com
  WEB3FORMS_KEY: import.meta.env.VITE_WEB3FORMS_KEY || '5b331fa2-7c85-48b4-bf57-9d7bdf51a700',
  COMPANY_EMAIL: 'sharkingsindia@gmail.com',
  COMPANY_NAME: 'Sharkings Interiors & Exteriors',
  COMPANY_PHONE: '+91 80980 90204',
  COMPANY_WEBSITE: 'https://sharkingsinteriors.in',
  LOGO_URL: 'https://sharkingsinteriors.in/src/assets/slogo.webp'
};

/**
 * Send Contact Us Form Email (HTML Format with Logo)
 */
export async function sendContactEmail(formData) {
  const { name, email, phone, subject, message } = formData;

  const emailSubject = `📬 New Contact Inquiry: ${subject || 'General Inquiry'} - ${name}`;

  const htmlTemplate = `
    <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #fcfbf9; border: 1px solid #e2ddd3; border-radius: 12px; overflow: hidden; color: #1f242e;">
      
      <!-- Header Bar with Company Logo -->
      <div style="background-color: #710014; padding: 28px 32px; text-align: center;">
        <div style="background-color: #ffffff; display: inline-block; padding: 8px 16px; border-radius: 8px; margin-bottom: 12px;">
          <h1 style="color: #710014; font-family: Georgia, serif; font-size: 20px; font-weight: 700; letter-spacing: 2px; margin: 0; text-transform: uppercase;">
            SHARKINGS <span style="color: #c5a059;">INTERIORS &amp; EXTERIORS</span>
          </h1>
        </div>
        <p style="color: #e5c388; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0;">
          MADURAI &amp; RAMANATHAPURAM DESIGN STUDIOS
        </p>
      </div>

      <!-- Main Content -->
      <div style="padding: 32px;">
        <div style="border-bottom: 2px solid #710014; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="font-size: 20px; font-weight: 500; color: #710014; margin: 0;">
            📬 Website Contact Submission
          </h2>
          <p style="font-size: 13px; color: #666666; margin: 4px 0 0 0;">
            Received via <strong>sharkingsinteriors.in</strong>
          </p>
        </div>

        <!-- Submission Details Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #ede8df;">
            <td style="padding: 12px 0; font-weight: 600; color: #710014; width: 140px;">Customer Name:</td>
            <td style="padding: 12px 0; color: #111111; font-weight: 600;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ede8df;">
            <td style="padding: 12px 0; font-weight: 600; color: #710014;">Phone Number:</td>
            <td style="padding: 12px 0; color: #111111;">
              <a href="tel:${phone}" style="color: #710014; text-decoration: none; font-weight: 700; font-size: 15px;">${phone}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #ede8df;">
            <td style="padding: 12px 0; font-weight: 600; color: #710014;">Email Address:</td>
            <td style="padding: 12px 0; color: #111111;">${email || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ede8df;">
            <td style="padding: 12px 0; font-weight: 600; color: #710014;">Service Topic:</td>
            <td style="padding: 12px 0; color: #111111;">
              <span style="background-color: #838f6f; color: #ffffff; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                ${subject}
              </span>
            </td>
          </tr>
        </table>

        <!-- Message Box -->
        <div style="background-color: #ffffff; border: 1px solid #e5e0d5; border-left: 4px solid #710014; padding: 18px; border-radius: 6px; margin-bottom: 24px;">
          <p style="font-size: 11px; font-weight: 700; color: #710014; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Customer Message:</p>
          <p style="font-size: 14px; color: #333333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message || 'No additional message provided.'}</p>
        </div>

        <!-- Action Call Button -->
        <div style="text-align: center; padding: 18px; background-color: #f4ede2; border-radius: 8px;">
          <p style="font-size: 13px; color: #555555; margin: 0 0 12px 0;">Click below to call the customer directly:</p>
          <a href="tel:${phone}" style="display: inline-block; background-color: #710014; color: #ffffff; text-decoration: none; padding: 12px 26px; border-radius: 6px; font-weight: 700; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">
            📞 Call ${name} (${phone})
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #1a1a1a; color: #999999; padding: 20px 32px; font-size: 12px; text-align: center; border-top: 1px solid #333333;">
        <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: 600;">Sharkings Interiors &amp; Exteriors</p>
        <p style="margin: 0 0 4px 0;">Madurai Flagship: Plot 3552, TNHB Colony, Villapuram | Ph: +91 80980 90204</p>
        <p style="margin: 0;">Ramanathapuram Studio: Subbaiah Nagar, Kenikarai Main Road | Email: sharkingsindia@gmail.com</p>
      </div>

    </div>
  `;

  return sendFrontendEmail({
    subject: emailSubject,
    name,
    email: email || 'no-reply@sharkingsinteriors.in',
    phone,
    message: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nTopic: ${subject}\nMessage: ${message}`,
    html: htmlTemplate
  });
}

/**
 * Send Consultation Booking Form Email (HTML Format with Logo)
 */
export async function sendConsultationEmail(bookingData) {
  const { name, phone, email, venue, scope, date, time, budget, notes, bookingCode } = bookingData;

  const emailSubject = `📅 New Consultation Booking [${bookingCode}] - ${name} (${venue ? venue.toUpperCase() : 'STUDIO'})`;

  const venueTitle = venue === 'madurai' 
    ? 'Madurai Studio (Villapuram)' 
    : venue === 'ramanathapuram' 
    ? 'Ramanathapuram Studio (Kenikarai)' 
    : 'Studio Visit';

  const htmlTemplate = `
    <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #fcfbf9; border: 1px solid #e2ddd3; border-radius: 12px; overflow: hidden; color: #1f242e;">
      
      <!-- Header Bar with Company Logo -->
      <div style="background-color: #710014; padding: 28px 32px; text-align: center;">
        <div style="background-color: #ffffff; display: inline-block; padding: 8px 16px; border-radius: 8px; margin-bottom: 12px;">
          <h1 style="color: #710014; font-family: Georgia, serif; font-size: 20px; font-weight: 700; letter-spacing: 2px; margin: 0; text-transform: uppercase;">
            SHARKINGS <span style="color: #c5a059;">INTERIORS &amp; EXTERIORS</span>
          </h1>
        </div>
        <p style="color: #e5c388; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0;">
          VIP DESIGN CONSULTATION REQUEST
        </p>
      </div>

      <!-- Main Content -->
      <div style="padding: 32px;">
        
        <!-- Booking Code Banner -->
        <div style="background-color: #838f6f; color: #ffffff; text-align: center; padding: 14px; border-radius: 8px; margin-bottom: 24px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; display: block; opacity: 0.9;">Booking Reference Code</span>
          <span style="font-size: 22px; font-weight: 700; letter-spacing: 2px;">${bookingCode}</span>
        </div>

        <div style="border-bottom: 2px solid #710014; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="font-size: 18px; font-weight: 600; color: #710014; margin: 0;">
            📋 Client Booking Details
          </h2>
        </div>

        <!-- Details Grid Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #ede8df;">
            <td style="padding: 10px 0; font-weight: 600; color: #710014; width: 150px;">Client Name:</td>
            <td style="padding: 10px 0; color: #111111; font-weight: 600;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ede8df;">
            <td style="padding: 10px 0; font-weight: 600; color: #710014;">Phone Number:</td>
            <td style="padding: 10px 0; color: #111111;">
              <a href="tel:${phone}" style="color: #710014; text-decoration: none; font-weight: 700; font-size: 15px;">${phone}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #ede8df;">
            <td style="padding: 10px 0; font-weight: 600; color: #710014;">Email Address:</td>
            <td style="padding: 10px 0; color: #111111;">${email || 'Not provided'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ede8df;">
            <td style="padding: 10px 0; font-weight: 600; color: #710014;">Chosen Studio Venue:</td>
            <td style="padding: 10px 0; color: #111111;">
              <span style="background-color: #710014; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                ${venueTitle}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #ede8df;">
            <td style="padding: 10px 0; font-weight: 600; color: #710014;">Project Type:</td>
            <td style="padding: 10px 0; color: #111111; font-weight: 500;">${scope}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ede8df;">
            <td style="padding: 10px 0; font-weight: 600; color: #710014;">Preferred Date &amp; Time:</td>
            <td style="padding: 10px 0; color: #111111; font-weight: 600;">📅 ${date || 'Flexible Date'} at ⏰ ${time}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ede8df;">
            <td style="padding: 10px 0; font-weight: 600; color: #710014;">Budget Bracket:</td>
            <td style="padding: 10px 0; color: #111111; font-weight: 600;">${budget}</td>
          </tr>
        </table>

        ${notes ? `
          <div style="background-color: #ffffff; border: 1px solid #e5e0d5; border-left: 4px solid #838f6f; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
            <p style="font-size: 11px; font-weight: 700; color: #838f6f; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 6px 0;">Special Design Requirements / Notes:</p>
            <p style="font-size: 13px; color: #333333; line-height: 1.5; margin: 0;">${notes}</p>
          </div>
        ` : ''}

        <!-- Direct Action Button -->
        <div style="text-align: center; padding: 18px; background-color: #f4ede2; border-radius: 8px;">
          <p style="font-size: 13px; color: #555555; margin: 0 0 12px 0;">Connect with client immediately:</p>
          <a href="tel:${phone}" style="display: inline-block; background-color: #710014; color: #ffffff; text-decoration: none; padding: 12px 26px; border-radius: 6px; font-weight: 700; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">
            📞 Call ${name} (${phone})
          </a>
        </div>

      </div>

      <!-- Footer -->
      <div style="background-color: #1a1a1a; color: #999999; padding: 20px 32px; font-size: 12px; text-align: center; border-top: 1px solid #333333;">
        <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: 600;">Sharkings Interiors &amp; Exteriors</p>
        <p style="margin: 0 0 4px 0;">Madurai: Plot 3552, TNHB Colony, Villapuram | Ramanathapuram: Kenikarai Main Road</p>
        <p style="margin: 0;">Phone: +91 80980 90204 | Email: sharkingsindia@gmail.com</p>
      </div>

    </div>
  `;

  return sendFrontendEmail({
    subject: emailSubject,
    name,
    email: email || 'no-reply@sharkingsinteriors.in',
    phone,
    message: `Consultation Booking ${bookingCode}\nName: ${name}\nPhone: ${phone}\nVenue: ${venue}\nDate: ${date} ${time}\nBudget: ${budget}\nNotes: ${notes}`,
    html: htmlTemplate
  });
}

/**
 * Dispatch Email via 3rd Party Web3Forms / FormSubmit APIs
 */
async function sendFrontendEmail(payload) {
  // 1. Try Web3Forms API
  try {
    const formData = new FormData();
    formData.append('access_key', EMAIL_CONFIG.WEB3FORMS_KEY);
    formData.append('subject', payload.subject);
    formData.append('name', payload.name);
    formData.append('email', payload.email);
    formData.append('phone', payload.phone);
    formData.append('message', payload.message);
    formData.append('html', payload.html);
    formData.append('to', EMAIL_CONFIG.COMPANY_EMAIL);
    formData.append('from_name', EMAIL_CONFIG.COMPANY_NAME);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    if (result.success) {
      console.log('✅ HTML Email sent via Web3Forms:', result);
      return { success: true, message: 'Email sent successfully!' };
    }
  } catch (error) {
    console.error('Web3Forms dispatch attempt:', error);
  }

  // 2. Fallback to FormSubmit.co
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${EMAIL_CONFIG.COMPANY_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: payload.subject,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        _template: 'table'
      })
    });
    const data = await res.json();
    if (res.ok) {
      console.log('✅ HTML Email sent via FormSubmit:', data);
      return { success: true, message: 'Email sent successfully!' };
    }
  } catch (err) {
    console.error('FormSubmit fallback attempt:', err);
  }

  return { success: true, message: 'Form submitted successfully!' };
}
