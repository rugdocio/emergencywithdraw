// Improvements:
// - Collect the current price of the token (expensive)
// - Cache token info (name, symbol)
// - Add generic fallback function that simply takes the first bytes of the poolInfo and userInfo

struct Pool {
    string symbol;
    string name;
    address want;
    uint256 allocPoint;
    uint16 depFee;
    uint256 amount;
    uint256 total;
}

interface IERC20 {
    function name() external view returns (string calldata);
    function symbol() external view returns (string calldata);
    function balanceOf(address user) external view returns (uint256);
}

interface Pair is IERC20 {
    function token0() external view returns (address);
    function token1() external view returns (address);
}

interface Masterchef {
    function poolInfo(uint256 pid) external view returns (address want, uint256 allocPoint, uint256 lastRewardBlock, uint256 accBELTPerShare,uint16 depFee);
    function userInfo(uint256 _pid, address _user) external view returns (uint256 shares, uint256 rewardDebt);
    function poolLength() external view returns (uint256);
}


contract Fetcher {
    function fetchPools(address _masterchef, address user, uint256 start, uint256 limit) public view returns (Pool[] memory) {
        Masterchef mc = Masterchef(_masterchef);
        
        // get poolLength
        uint256 poolLength = 0;
        try mc.poolLength() returns (uint256 _poolLength) {
            poolLength = _poolLength;
        } catch {
            revert("E0 Address is not a masterchef");
        }
        
        // Reduce poolLength to what we can fetch
        if (start + limit < poolLength) {
            poolLength = start + limit;
        }
        
        Pool[] memory pools = new Pool[](poolLength);
        if(poolLength == 0 || start >= poolLength) {
            return pools;
        }
         // In case the masterchef implements the standard poolInfo
        if(isStandardChef(mc)) {
            for (uint256 pid = start; pid < poolLength; pid++) {
                 pools[pid - start] = getPoolStandard(mc, pid, user);
            }
        }
        
        return pools;
    }
    
    function getPoolStandard(Masterchef mc, uint256 pid, address user) public view returns (Pool memory) {
         (address want, uint256 allocPoint,,,uint16 depFee) = mc.poolInfo(pid);
                 // fetch token name and symbol
                (string memory name, string memory symbol) = getTokenDetails(want);
                
                (uint256 amount, ) = mc.userInfo(pid, user);
                return Pool({
                     symbol: symbol,
                     name: name,
                     want: want,
                     allocPoint: allocPoint,
                     depFee: depFee,
                     amount: amount,
                     total: getTotal(address(mc), want)
                 });
    }
    
    function getTotal(address mc, address token) public view returns (uint256) {
        try IERC20(token).balanceOf(mc) returns (uint256 total) {
            return total;
        } catch {
            return 0;
        }
    }
    
    function getTokenDetails(address token) public view returns (string memory name, string memory symbol) {
         name = "UNKNOWN";
         symbol = "UNKNOWN";
         
         // Try to return the underlying token details in case it's an LP pair
         try Pair(token).token0() returns (address token0) {
             try Pair(token).token1() returns (address token1) {
                 (, string memory symbol1) = getTokenName(token0);
                 (, string memory symbol2) = getTokenName(token1);
                 name = string(abi.encodePacked(symbol1, " / ", symbol2, " LP"));
                 symbol = string(abi.encodePacked(symbol1, " / ", symbol2));
                 
                 return (name, symbol);
             } catch {}
        } catch {}
        
        // Just return the token details if it's not an LP pair.
        return getTokenName(token);
    }
    
    function getTokenName(address token) public view returns (string memory name, string memory symbol) {
        name = "UNKNOWN";
        symbol = "UNKNOWN";
        try IERC20(token).name() returns (string memory _name) {
            name = _name;
        } catch {}
        
        try IERC20(token).symbol() returns (string memory _symbol) {
            symbol = _symbol;
        } catch {}
        
        return (name, symbol);
    }
    
    // isStandardChef finds out if the poolInfo method is the standard one (panther uses a different one).
    function isStandardChef(Masterchef mc) public view returns (bool) {
        try mc.poolInfo(0) returns (address, uint256, uint256, uint256, uint16) {
            return true;
        } catch {
            return false;
        }
    }
}