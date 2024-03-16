export function program(statements) {
  return { kind: "Program", statements };
}

export function variableDeclaration(variable, initializer) {
  return { kind: "VariableDeclaration", variable, initializer };
}

export function functionDeclaration(fun, params, returnType, body) {
  return { kind: "FunctionDeclaration", fun, params, returnType, body };
}

export function breakStatement() {
  return { kind: "BreakStatement" };
}

export function returnStatement(argument) {
  return { kind: "ReturnStatement", argument };
}

export function ifStatement(test, consequent, alternate) {
  return { kind: "IfStatement", test, consequent, alternate };
}

export function loopStatement(test, body) {
  return { kind: "LoopStatement", test, body };
}

export function binaryExpression(op, left, right) {
  return { kind: "BinaryExpression", op, left, right };
}

export function unaryExpression(op, operand) {
  return { kind: "UnaryExpression", op, operand };
}

export function callExpression(callee, args) {
  return { kind: "CallExpression", callee, args };
}

export function literal(value) {
  return { kind: "Literal", value };
}

export function identifier(name) {
  return { kind: "Identifier", name };
}

export const standardLibrary = Object.freeze({
  print: identifier("print"),
  break: identifier("break"),
  if: identifier("if"),
  else: identifier("else"),
  while: identifier("while"),
  true: literal(true),
  false: literal(false),
});
