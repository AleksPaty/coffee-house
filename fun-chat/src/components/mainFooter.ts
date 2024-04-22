import { ElemConstruct } from '../utils/elemConstruct';

export class MainFooter {
    private makeLinkToGH() {
        const gHLink = ElemConstruct('a', 'gh-link', 'My Github', undefined, [
            { href: 'https://github.com/AleksPaty' },
            { target: '_blank' },
        ]);
        return gHLink;
    }

    private makeAboutElem() {
        const about = ElemConstruct('p', 'about', 'Thank you for your attention. 2024 ©');
        return about;
    }

    private makeSchoolLog() {
        const rsSchool = ElemConstruct('p', 're-school', 'RSSchool');
        return rsSchool;
    }

    public render() {
        const footer = ElemConstruct('div', 'main-footer');
        footer.append(this.makeLinkToGH(), this.makeAboutElem(), this.makeSchoolLog());
        return footer;
    }
}
