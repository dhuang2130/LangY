import * as core from "./core.js";

class Context {
  constructor({ parent, locals = {} }) {
    this.parent = parent;
    this.locals = new Map(Object.entries(locals));
  }

  add(name, entity) {
    this.locals.set(name, entity);
  }

  lookup(name) {
    return this.locals.get(name) || this.parent?.lookup(name);
  }
}

export default function analyze(match) {
  let context = new Context({ locals: core.standardLibrary });

  function must(condition, message, errorLocation) {
    if (!condition) {
      const prefix = errorLocation.at.source.getLineAndColumnMessage();
      throw new Error(`${prefix}${message}`);
    }
  }

  function mustNotAlreadyBeDeclared(name, at) {
    must(
      !context.locals.has(name),
      `Identifier ${name} already declared`,
      at
    );
  }

  function mustHaveBeenFound(entity, name, at) {
    must(entity, `Identifier ${name} not declared`, at);
  }

  function mustBeAVariable(entity, at) {
    must(
      entity?.kind === "Variable",
      `Functions can not appear here`,
      at
    );
  }

  function mustBeAFunction(entity, at) {
    must(
      entity?.kind === "Function",
      `${entity.name} is not a function`,
      at
    );
  }

  function mustNotBeReadOnly(entity, at) {
    must(!entity.readOnly, `${entity.name} is read only`, at);
  }

  function mustHaveCorrectArgumentCount(argCount, paramCount, at) {
    const equalCount = argCount === paramCount;
    must(
      equalCount,
      `${paramCount} argument(s) required but ${argCount} passed`,
      at
    );
  }

  const builder = match.matcher.grammar.createSemantics().addOperation("rep", {
    Program(statements) {
      return core.program(statements.children.map(s => s.rep()));
    },

    variableDeclaration(_let, id, _eq, exp, _semicolon) {
      const initializer = exp.rep();
      const variable = core.variable(id.sourceString, false);
      mustNotAlreadyBeDeclared(id.sourceString, { at: id });
      context.add(id.sourceString, variable);
      return core.variableDeclaration(variable, initializer);
    },

    functionDeclaration(id, params, _equals, exp, _semicolon) {
      const fun = core.fun(id.sourceString);
      mustNotAlreadyBeDeclared(id.sourceString, { at: id });

      context = new Context({ parent: context });
      const parameters = params.rep();
      fun.paramCount = parameters.length;
      const returnType = null; // Return type not supported in current grammar
      const body = exp.rep();
      context = context.parent;

      return core.functionDeclaration(fun, parameters, returnType, body);
    },

    Param(id, _colon, type) {
      return core.variable(id.sourceString, true);
    },

    assignment(id, _eq, exp, _semicolon) {
      const target = id.rep();
      mustNotBeReadOnly(target, { at: id });
      return core.assignment(target, exp.rep());
    },

    print(_print, exp, _semicolon) {
      return core.printStatement(exp.rep());
    },

    while(_while, exp, block) {
      return core.whileStatement(exp.rep(), block.rep());
    },

    Block(_open, statements, _close) {
      return core.block(statements.children.map(s => s.rep()));
    },

    unaryExpression(op, exp) {
      return core.unary(op.sourceString, exp.rep());
    },

    binaryExpression(exp1, op, exp2) {
      return core.binary(op.sourceString, exp1.rep(), exp2.rep());
    },

    callExpression(id, _open, expList, _close) {
      const callee = context.lookup(id.sourceString);
      mustHaveBeenFound(callee, id.sourceString, { at: id });
      mustBeAFunction(callee, { at: id });
      const args = expList.asIteration().children.map(arg => arg.rep());
      mustHaveCorrectArgumentCount(
        args.length,
        callee.paramCount,
        { at: id }
      );
      return core.call(callee, args);
    },

    Exp_id(id) {
      const entity = context.lookup(id.sourceString);
      mustHaveBeenFound(entity, id.sourceString, { at: id });
      mustBeAVariable(entity, { at: id });
      return entity;
    },

    true(_) {
      return true;
    },

    false(_) {
      return false;
    },

    num(_whole, _point, _fraction, _e, _sign, _exponent) {
      return Number(this.sourceString);
    },
  });

  return builder(match).rep();
}
