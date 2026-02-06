export interface SettingsRequest {
  phoneNumber: string;
  email: string;
  instagramUrl: string;
  linkedinUrl: string;
  address: string;
  privacyText: string;
  privacyPolicy: string;
  contactFormText: string;
  cookiePolicy: string;
  siteLogo?: File | string;
}

export interface SettingsResponse {
  id: number;
  phoneNumber: string;
  email: string;
  instagramUrl: string;
  linkedinUrl: string;
  address: string;
  privacyText: string;
  privacyPolicy: string;
  contactFormText: string;
  cookiePolicy: string;
  siteLogoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}
