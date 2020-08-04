// import grammar from '../test/.old/grammar';
// import lexer from "../test/.old/lexer";

export interface Test {
    name: string,
    description?: string,
    test: () => boolean | Promise<boolean>
}

export interface TestGroup {
    name: string,
    description: string,
    tests: Test[]
}

async function Runner(testGroup: TestGroup[]): Promise<{totalTests: number, succeeded: number}> {
    let succeeded: number = 0;

    for (const group of testGroup) {
        console.log(`\nRunning tests ${group.name}`);
        for (const test of group.tests) {
            console.log(`  Running ${test.name} of ${group.name}`);
            const unit: boolean = await test.test();
            console.log(`    ${test.name} - ${unit ? "passed" : "failed"}`);
            if (unit)
                succeeded++;
        }
    }

    const totalTests: number = testGroup.map(i => i.tests.length).reduce((a, i) => a + i)

    console.log(`\nUnit Complete, ${succeeded}/${totalTests} succeeded`)

    return {
        totalTests,
        succeeded
    };
}

// const tests: Promise<{totalTests: number, succeeded: number}>[] = [grammar(), lexer()].map(i => Runner(i));
const tests: Promise<{totalTests: number, succeeded: number}>[] = [].map(i => Runner(i));

Promise.all(tests).then(function (success) {
    console.log(`All Tests Complete - ${success.filter(i => i.totalTests === i.succeeded).length}/${tests.length} units passed`);
});
