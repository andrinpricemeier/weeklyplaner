export class SubjectService {
    private readonly subjects: string[] = ["Computer", "Deutsch", "Englisch", "Lesen", "Mathe", "Musik"];

    getSubjects(): string[] {
        const unmodifiableList = [...this.subjects];
        return unmodifiableList;
    }

    isKnownSubject(potentialSubject: string): boolean {
        return this.subjects.map(subject => subject.toLowerCase()).includes(potentialSubject.toLowerCase());
    }
}
