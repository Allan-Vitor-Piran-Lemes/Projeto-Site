// client/src/pages/privacy-policy-page/index.tsx
import React, { useMemo } from 'react';
//import { Button } from 'primereact/button';

export const PrivacyPolicyPage: React.FC = () => {
    
    // CORREÇÃO: Tipagem obrigatória para evitar erros nos estilos
    const styleDefinitions = useMemo(() => ({
        titleStyle: { 
            color: '#5a0000', 
            borderBottom: '3px solid #5a0000', 
            paddingBottom: '10px', 
            marginBottom: '30px', 
            fontSize: '2.2em', 
            textAlign: 'center',
        } as React.CSSProperties,

        h2Style: { 
            color: '#5a0000', 
            borderLeft: '4px solid #5a0000', 
            paddingLeft: '15px', 
            marginTop: '30px', 
            marginBottom: '15px', 
            fontSize: '1.4em',
        } as React.CSSProperties,

        h3Style: { 
            color: '#333', 
            marginTop: '20px', 
            marginBottom: '10px', 
            fontSize: '1.2em',
        } as React.CSSProperties,

        infoBoxStyle: { 
            background: '#f8f8f8', 
            padding: '20px', 
            borderRadius: '5px', 
            border: '1px solid #ddd', 
            margin: '20px 0',
        } as React.CSSProperties,

        highlightStyle: { 
            background: '#fff3cd', 
            padding: '15px', 
            borderLeft: '4px solid #ffc107', 
            margin: '20px 0', 
            borderRadius: '4px',
        } as React.CSSProperties,

        contactBoxStyle: { 
            background: '#e8f4f8', 
            border: '1px solid #bee5eb', 
            padding: '20px', 
            borderRadius: '5px', 
            margin: '20px 0',
        } as React.CSSProperties,

        pStyle: { 
            marginBottom: '12px', 
            textAlign: 'justify',
        } as React.CSSProperties,

        ulStyle: { 
            marginLeft: '20px', 
            marginBottom: '15px', 
            listStyleType: 'disc',
        } as React.CSSProperties,

        liStyle: { 
            marginBottom: '5px',
        } as React.CSSProperties,

    }), []);

    // Desestruturar o objeto de estilos para o escopo local
    const { 
        titleStyle, h2Style, h3Style, infoBoxStyle, highlightStyle, 
        contactBoxStyle, pStyle, ulStyle, liStyle 
    } = styleDefinitions;


    return (
        <div className="container mx-auto px-4 pt-5"> 
            <div style={{maxWidth: '800px', margin: '0 auto'}}>
                
                {/* MUDANÇA: Usando a variável desestruturada */}
                <h1 style={titleStyle}>PRIVACY POLICY</h1> 

                <p className="date-updated text-center" style={{fontStyle: 'italic', color: '#666', marginBottom: '30px'}}>
                    <strong>Last updated: July 05, 2025</strong>
                </p>

                <h2 style={h2Style}>1. COMPANY IDENTIFICATION</h2>
                <div style={infoBoxStyle}>
                    <p style={pStyle}><strong>Tabula Tecnologia Ltda.</strong></p>
                    <ul style={ulStyle}>
                        <li style={liStyle}>CNPJ: 00.623.904/0001-73</li>
                        <li style={liStyle}>Address: Rua Ernesto Beuter, 53</li>
                        <li style={liStyle}>CEP: 123.45678-50</li>
                        <li style={liStyle}>Email: tabula.email@tabulairos.com</li>
                        <li style={liStyle}>Phone: +55 (99) 99999-9999</li>
                    </ul>
                </div>

                <h2 style={h2Style}>2. ABOUT THIS POLICY</h2>
                <p style={pStyle}>This Privacy Policy aims to clarify how Tabula collects, uses, stores, and protects the personal information of our service users, in conformity with the General Data Protection Law (LGPD - Law No. 13.709/2018).</p>

                <h2 style={h2Style}>3. INFORMATION WE COLLECT</h2>
                
                <h3 style={h3Style}>3.1 Personal Data Provided Directly</h3>
                <ul style={ulStyle}>
                    <li style={liStyle}>Full Name</li>
                    <li style={liStyle}>Email</li>
                    <li style={liStyle}>Phone</li>
                    <li style={liStyle}>CPF/CNPJ</li>
                    <li style={liStyle}>Address</li>
                    <li style={liStyle}>Date of birth</li>
                    <li style={liStyle}>Payment information</li>
                </ul>

                <h3 style={h3Style}>3.2 Data Collected Automatically</h3>
                <ul style={ulStyle}>
                    <li style={liStyle}>IP address</li>
                    <li style={liStyle}>Browser information</li>
                    <li style={liStyle}>Cookies and similar technologies</li>
                    <li style={liStyle}>Location data</li>
                    <li style={liStyle}>Website browsing history</li>
                </ul>

                <h3 style={h3Style}>3.3 Third-Party Data</h3>
                <ul style={ulStyle}>
                    <li style={liStyle}>Information obtained through social media (when authorized)</li>
                    <li style={liStyle}>Commercial partner data</li>
                    <li style={liStyle}>Credit bureau information</li>
                </ul>

                <h2 style={h2Style}>4. PURPOSE OF PROCESSING</h2>
                <p style={pStyle}>We use your personal data for:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>Provision of contracted services</li>
                    <li style={liStyle}>Communication with the user</li>
                    <li style={liStyle}>Payment processing</li>
                    <li style={liStyle}>Compliance with legal obligations</li>
                    <li style={liStyle}>Statistical analysis and service improvement</li>
                    <li style={liStyle}>Marketing and advertising (when consented)</li>
                    <li style={liStyle}>Fraud prevention</li>
                    <li style={liStyle}>Customer service</li>
                </ul>

                <h2 style={h2Style}>5. LEGAL BASIS FOR PROCESSING</h2>
                <p style={pStyle}>The processing of your personal data is based on the following legal grounds:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>Data subject's consent</li>
                    <li style={liStyle}>Contract execution</li>
                    <li style={liStyle}>Compliance with legal obligation</li>
                    <li style={liStyle}>Legitimate interest</li>
                    <li style={liStyle}>Protection of life</li>
                    <li style={liStyle}>Regular exercise of rights</li>
                </ul>

                <h2 style={h2Style}>6. DATA SHARING</h2>
                <p style={pStyle}>Your data may be shared with:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>Service providers and partners</li>
                    <li style={liStyle}>Competent authorities (when required by law)</li>
                    <li style={liStyle}>Tabula group companies</li>
                    <li style={liStyle}>Payment processors</li>
                    <li style={liStyle}>Analytics and marketing companies (anonymized data)</li>
                </ul>
                
                <div style={highlightStyle}>
                    <p style={pStyle}><strong>Important:</strong> We do not sell, rent, or trade your personal data with third parties for purposes unrelated to our services.</p>
                </div>

                <h2 style={h2Style}>7. STORAGE AND SECURITY</h2>
                
                <h3 style={h3Style}>7.1 Retention Period</h3>
                <ul style={ulStyle}>
                    <li style={liStyle}>Registration data: while the account is active</li>
                    <li style={liStyle}>Transaction data: 5 years after the last transaction</li>
                    <li style={liStyle}>Marketing data: until consent is withdrawn</li>
                    <li style={liStyle}>Data for legal compliance: as required by law</li>
                </ul>

                <h3 style={h3Style}>7.2 Security Measures</h3>
                <ul style={ulStyle}>
                    <li style={liStyle}>Encryption of sensitive data</li>
                    <li style={liStyle}>Restricted access control</li>
                    <li style={liStyle}>24/7 security monitoring</li>
                    <li style={liStyle}>Regularly tested backup</li>
                    <li style={liStyle}>Team training in data protection</li>
                </ul>

                <h2 style={h2Style}>8. YOUR RIGHTS</h2>
                <p style={pStyle}>You have the following rights over your personal data:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}><strong>Access:</strong> know what data we hold about you</li>
                    <li style={liStyle}><strong>Retification:</strong> correct incomplete or incorrect data</li>
                    <li style={liStyle}><strong>Deletion:</strong> request the removal of your data</li>
                    <li style={liStyle}><strong>Portability:</strong> receive your data in a structured format</li>
                    <li style={liStyle}><strong>Objection:</strong> object to the processing of your data</li>
                    <li style={liStyle}><strong>Limitation:</strong> restrict the processing of your data</li>
                    <li style={liStyle}><strong>Revocation:</strong> withdraw consent at any time</li>
                </ul>

                <h2 style={h2Style}>9. COOKIES AND SIMILAR TECHNOLOGIES</h2>
                <p style={pStyle}>We use cookies to:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>Improve user experience</li>
                    <li style={liStyle}>Analyze site traffic</li>
                    <li style={liStyle}>Personalize content</li>
                    <li style={liStyle}>Facilitate the login process</li>
                </ul>
                <p style={pStyle}>You can manage your cookie preferences through your browser settings.</p>

                <h2 style={h2Style}>10. INTERNATIONAL TRANSFER</h2>
                <p style={pStyle}>Some of our service providers may be located outside of Brazil. We ensure that these transfers only occur to countries with an adequate level of data protection or through appropriate safeguards.</p>

                <h2 style={h2Style}>11. MINORS</h2>
                <p style={pStyle}>We do not intentionally collect data from minors under 18 without the consent of parents or guardians. If we become aware that we have collected data from minors without authorization, we will take steps to remove it.</p>

                <h2 style={h2Style}>12. CHANGES TO THIS POLICY</h2>
                <p style={pStyle}>This policy may be updated periodically. We will notify you of significant changes through:</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>Email to registered users</li>
                    <li style={liStyle}>Notice on our website</li>
                    <li style={liStyle}>Notification in our application</li>
                </ul>

                <h2 style={h2Style}>13. COMMUNICATION CHANNEL</h2>
                <p style={pStyle}>To exercise your rights, clarify doubts, or report data protection incidents, contact us:</p>
                
                <div style={contactBoxStyle}>
                    <p style={pStyle}><strong>Data Protection Officer (DPO):</strong></p>
                    <ul style={ulStyle}>
                        <li style={liStyle}>Email: tabula.email@tabulairos.com</li>
                        <li style={liStyle}>Phone: +55 (99) 99999-9999</li>
                        <li style={liStyle}>Address: Rua Ernesto Beuter, 53 - CEP: 123.45678-50</li>
                    </ul>
                    <p style={pStyle}><strong>Response time:</strong> up to 15 business days</p>
                </div>

                <h2 style={h2Style}>14. SUPERVISORY AUTHORITY</h2>
                <p style={pStyle}>In case of non-resolution of conflicts, you may contact the National Data Protection Authority (ANPD):</p>
                <ul style={ulStyle}>
                    <li style={liStyle}>Website: www.gov.br/anpd</li>
                    <li style={liStyle}>Email: comunicacao@anpd.gov.br</li>
                </ul>

                <h2 style={h2Style}>15. GENERAL PROVISIONS</h2>
                <p style={pStyle}>This policy is governed by Brazilian laws, especially the LGPD. Any disputes will be resolved in the jurisdiction of our headquarters.</p>
                <p style={pStyle}><strong>Effective date:</strong> This policy takes effect on the date of its publication and remains valid indefinitely.</p>

                <div style={{textAlign: 'center', fontWeight: 'bold', marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #5a0000'}}>
                    <p style={pStyle}>Tabula Tecnologia Ltda.</p>
                    <p style={pStyle}>CNPJ: 00.623.904/0001-73</p>
                </div>
            </div>
        </div>
    );
};
