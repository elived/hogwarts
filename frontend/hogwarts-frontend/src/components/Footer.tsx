import "./styles/FooterStyle.css";

export function Footer(){
    return (
        <footer className="footer">
            <div className="footer-content">
                
                <p>
                    A tiny fantasy project to practice React, TypeScript, and Vite.
                </p>
                <img src="/images/hogwarts_crest.png" alt={`slytherin icon`} className="custom-list-img"/>

                <p><br/></p>
            </div>
        </footer>
    )
 }